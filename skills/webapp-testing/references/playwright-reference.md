# Playwright Testing Reference

Reference for the `webapp-testing` skill. Covers Playwright patterns, selector strategies, and common automation scenarios.

## Selector Priority

Use selectors in this order of preference:

1. **Role-based** (most robust): `page.get_by_role("button", name="Submit")`
2. **Text-based**: `page.get_by_text("Sign in")`
3. **Label-based**: `page.get_by_label("Email")`
4. **Test ID**: `page.get_by_test_id("submit-btn")`
5. **CSS selector** (fallback): `page.locator(".submit-button")`
6. **XPath** (last resort): `page.locator("//button[@type='submit']")`

## Common Wait Patterns

```python
# Wait for network to be idle (best for SPAs)
page.wait_for_load_state("networkidle")

# Wait for a specific element
page.wait_for_selector(".dashboard-loaded")

# Wait for navigation
with page.expect_navigation():
    page.click("a[href='/dashboard']")

# Wait for response
with page.expect_response("**/api/v1/users") as resp:
    page.click("button#load-users")
response = resp.value
```

## Screenshot Patterns

```python
# Full page screenshot
page.screenshot(path="/tmp/full-page.png", full_page=True)

# Viewport only
page.screenshot(path="/tmp/viewport.png")

# Specific element
page.locator(".dashboard-card").screenshot(path="/tmp/card.png")
```

## Form Interaction

```python
# Fill a text input
page.get_by_label("Email").fill("test@example.com")
page.get_by_label("Password").fill("password123")

# Select a dropdown
page.get_by_label("Role").select_option("admin")

# Check a checkbox
page.get_by_label("Remember me").check()

# Submit the form
page.get_by_role("button", name="Sign in").click()
```

## Console Log Capture

```python
messages = []
page.on("console", lambda msg: messages.append(f"[{msg.type}] {msg.text}"))

# Navigate and interact...
page.goto("http://localhost:5173")
page.wait_for_load_state("networkidle")

# Print all messages
for msg in messages:
    print(msg)
```

## Network Interception

```python
# Mock an API response
page.route("**/api/v1/users", lambda route: route.fulfill(
    status=200,
    content_type="application/json",
    body='{"data": [{"id": "1", "name": "Test User"}]}'
))
```

## Assertions

```python
from playwright.sync_api import expect

# Element is visible
expect(page.get_by_role("heading", name="Dashboard")).to_be_visible()

# Element contains text
expect(page.locator(".user-name")).to_have_text("John Doe")

# Page has URL
expect(page).to_have_url("http://localhost:5173/dashboard")

# Input has value
expect(page.get_by_label("Email")).to_have_value("test@example.com")
```

## Debugging Tips

- Save screenshots at each step: `page.screenshot(path=f"/tmp/step-{n}.png")`
- Print page title: `print(page.title())`
- Print all links: `print([a.get_attribute("href") for a in page.locator("a").all()])`
- Check for JS errors: `page.on("pageerror", lambda err: print(f"JS Error: {err}"))`
