var btn = document.querySelector("#btn");

const setBtnBgColor = () => {
  chrome.storage.sync.get("color", ({ color }) => {
    btn.style.backgroundColor = color;
    btn.textContent = color;
  });
};
setBtnBgColor();

btn.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageBgColor,
  });
  setBtnBgColor();
});

function setPageBgColor() {
  chrome.storage.sync.get("color", ({ color }) => {
    document.body.style.backgroundColor = color;
    const newColor = [...color]
      .map((i) => i.replace(/[^#]/, (1 + ~~(Math.random() * 15)).toString(16)))
      .join("");
    // modify color
    chrome.storage.sync.set({
      color: newColor,
    });
  });
}
