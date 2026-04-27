"""
element_discovery.py

Discover all interactive elements on a page: buttons, links, inputs, and selects.
Useful for reconnaissance before writing targeted test scripts.

Usage:
    python element_discovery.py --url http://localhost:5173
"""
from playwright.sync_api import sync_playwright
import argparse


def discover_elements(url: str) -> None:
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        print(f"\nDiscovering elements at: {url}")
        page.goto(url)
        page.wait_for_load_state("networkidle")

        # Screenshot for reference
        page.screenshot(path="/tmp/discovery.png", full_page=True)
        print("Screenshot saved to /tmp/discovery.png")

        # Buttons
        buttons = page.get_by_role("button").all()
        print(f"\nButtons ({len(buttons)}):")
        for btn in buttons:
            print(f"  - '{btn.inner_text().strip()}' [{btn.get_attribute('type') or 'button'}]")

        # Links
        links = page.get_by_role("link").all()
        print(f"\nLinks ({len(links)}):")
        for link in links:
            print(f"  - '{link.inner_text().strip()}' → {link.get_attribute('href')}")

        # Inputs
        inputs = page.locator("input").all()
        print(f"\nInputs ({len(inputs)}):")
        for inp in inputs:
            name = inp.get_attribute("name") or inp.get_attribute("id") or "(unnamed)"
            itype = inp.get_attribute("type") or "text"
            print(f"  - name='{name}' type='{itype}'")

        # Headings
        headings = page.locator("h1, h2, h3").all()
        print(f"\nHeadings ({len(headings)}):")
        for h in headings:
            print(f"  - {h.inner_text().strip()}")

        browser.close()


def main() -> None:
    parser = argparse.ArgumentParser(description="Discover interactive elements on a web page")
    parser.add_argument("--url", default="http://localhost:5173", help="Target URL")
    args = parser.parse_args()
    discover_elements(args.url)


if __name__ == "__main__":
    main()
