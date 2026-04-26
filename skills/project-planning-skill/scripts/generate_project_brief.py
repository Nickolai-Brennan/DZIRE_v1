from pathlib import Path
from datetime import datetime

TEMPLATE_PATH = Path("templates/project-brief-template.md")
OUTPUT_DIR = Path("outputs/project-briefs")

def render_template(template: str, values: dict) -> str:
    for key, value in values.items():
        template = template.replace(f"{{{{{key}}}}}", str(value))
    return template

def main():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    values = {
        "project_name": input("Project name: "),
        "project_description": input("Project description: "),
        "target_audience_1": input("Target audience 1: "),
        "target_audience_2": input("Target audience 2: "),
        "problem_statement": input("Problem statement: "),
        "solution_summary": input("Solution summary: "),
        "feature_1": input("Core feature 1: "),
        "feature_2": input("Core feature 2: "),
        "feature_3": input("Core feature 3: "),
        "revenue_model_1": input("Revenue model 1: "),
        "revenue_model_2": input("Revenue model 2: "),
        "traffic_channel_1": input("Traffic channel 1: "),
        "traffic_channel_2": input("Traffic channel 2: "),
        "competitor_1": input("Competitor 1: "),
        "competitor_2": input("Competitor 2: "),
        "gap_1": input("Market gap 1: "),
        "gap_2": input("Market gap 2: "),
        "frontend_stack": input("Frontend stack: "),
        "backend_stack": input("Backend stack: "),
        "database_stack": input("Database stack: "),
        "hosting_stack": input("Hosting stack: "),
        "data_requirement_1": input("Data requirement 1: "),
        "data_requirement_2": input("Data requirement 2: "),
        "kpi_1": input("KPI 1: "),
        "kpi_2": input("KPI 2: "),
        "risk_1": input("Risk 1: "),
        "risk_2": input("Risk 2: "),
        "opportunity_1": input("Opportunity 1: "),
        "opportunity_2": input("Opportunity 2: "),
        "notes": input("Notes: ")
    }

    template = TEMPLATE_PATH.read_text(encoding="utf-8")
    output = render_template(template, values)

    safe_name = values["project_name"].lower().replace(" ", "-")
    filename = f"{safe_name}-project-brief-{datetime.now().strftime('%Y%m%d')}.md"

    output_path = OUTPUT_DIR / filename
    output_path.write_text(output, encoding="utf-8")

    print(f"Created: {output_path}")

if __name__ == "__main__":
    main()
