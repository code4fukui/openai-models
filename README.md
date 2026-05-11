# openai-models

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

A simple project to automatically track and list new OpenAI models.

## Demo

View the latest list of models, updated daily:
- **https://code4fukui.github.io/openai-models/**

The web page displays a table of model IDs and their creation dates, sorted with the most recent models at the top.

## Features

- **Automated Daily Updates**: A GitHub Actions workflow runs every day at 22:28 UTC to fetch the latest model list.
- **Data Storage**: Model data is filtered and stored in a clean, version-controlled `openai-models.csv` file.
- **Simple Web Interface**: A static HTML page displays the contents of the CSV file.

## How It Works

1.  A scheduled GitHub Actions workflow (`.github/workflows/scheduled-fetch.yml`) runs daily.
2.  A Deno script (`fetchModels.js`) calls the OpenAI API endpoint `https://api.openai.com/v1/models`.
3.  The script filters for models where `owned_by` is `"system"`, extracting the `id` and `created` timestamp for each.
4.  The filtered list is sorted by creation date and saved to `openai-models.csv`.
5.  The workflow commits and pushes the updated CSV file back to the repository.

## Running Locally

To fetch the model list manually:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/code4fukui/openai-models.git
    cd openai-models
    ```

2.  **Set your API key:** Create a `.env` file in the root of the project with your OpenAI API key.
    ```bash
    echo "OPENAI_API_KEY=your-key-here" > .env
    ```

3.  **Run the script:** You will need [Deno](https://deno.land/) installed.
    ```bash
    deno run -A fetchModels.js
    ```
    This will overwrite `openai-models.csv` with the latest data.

## Data Format

The output is stored in `openai-models.csv` with the following columns:

-   `created`: The creation timestamp of the model in ISO 8601 format.
-   `id`: The unique identifier for the model (e.g., `gpt-4-1106-preview`).

---
[Source on GitHub](https://github.com/code4fukui/openai-models/)