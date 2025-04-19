import { fetchAPI } from "https://code4fukui.github.io/ai_chat/openai.js";
import { CSV } from "https://js.sabae.cc/CSV.js";
import { DateTime } from "https://js.sabae.cc/DateTime.js";

const models = await fetchAPI("https://api.openai.com/v1/models");
const list = models.data.filter(i => i.owned_by == "system").map(i => {
  return {
    created: new DateTime(i.created * 1000).toString(),
    id: i.id,
  };
});
list.sort((a, b) => a.created.localeCompare(b.created));

await Deno.writeTextFile("openai-models.csv", CSV.stringify(list));
