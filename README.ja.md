# openai-models

OpenAIの新しいモデルを自動的に追跡し、一覧化するシンプルなプロジェクトです。

## デモ

毎日更新される最新のモデル一覧をご覧ください:
- **https://code4fukui.github.io/openai-models/**

ウェブページにはモデルIDと作成日時の表が表示され、最新のモデルが一番上に並びます。

## 機能

- **毎日の自動更新**: GitHub Actionsのワークフローが毎日 22:28 UTC に実行され、最新のモデル一覧を取得します。
- **データの保存**: モデルデータはフィルタリングされ、バージョン管理されたクリーンな `openai-models.csv` ファイルに保存されます。
- **シンプルなウェブインターフェース**: 静的なHTMLページでCSVファイルの内容を表示します。

## 仕組み

1.  スケジュール設定されたGitHub Actionsのワークフロー (`.github/workflows/scheduled-fetch.yml`) が毎日実行されます。
2.  Denoスクリプト (`fetchModels.js`) がOpenAI APIのエンドポイント `https://api.openai.com/v1/models` を呼び出します。
3.  スクリプトは `owned_by` が `"system"` のモデルをフィルタリングし、それぞれの `id` と `created` タイムスタンプを抽出します。
4.  フィルタリングされた一覧は作成日時でソートされ、 `openai-models.csv` に保存されます。
5.  ワークフローは更新されたCSVファイルをコミットし、リポジトリにプッシュします。

## ローカルでの実行

モデル一覧を手動で取得するには:

1.  **リポジトリのクローン:**
    ```bash
    git clone https://github.com/code4fukui/openai-models.git
    cd openai-models
    ```

2.  **APIキーの設定:** プロジェクトのルートディレクトリに、OpenAI APIキーを記述した `.env` ファイルを作成します。
    ```bash
    echo "OPENAI_API_KEY=your-key-here" > .env
    ```

3.  **スクリプトの実行:** [Deno](https://deno.land/) がインストールされている必要があります。
    ```bash
    deno run -A fetchModels.js
    ```
    これにより `openai-models.csv` が最新のデータで上書きされます。

## データ形式

出力結果は以下の列を持つ `openai-models.csv` に保存されます:

-   `created`: ISO 8601形式のモデル作成タイムスタンプ。
-   `id`: モデルの一意の識別子（例: `gpt-4-1106-preview`）。

---
[GitHubのソースコード](https://github.com/code4fukui/openai-models/)
