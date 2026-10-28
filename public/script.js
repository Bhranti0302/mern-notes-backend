document.getElementById("year").textContent = new Date().getFullYear();

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("visible"));
}

const copyButton = document.getElementById("copyRequest");

copyButton?.addEventListener("click", async () => {
  const text = document.getElementById("curlExample").textContent;

  try {
    await navigator.clipboard.writeText(text);
    copyButton.textContent = "Copied!";

    setTimeout(() => {
      copyButton.textContent = "Copy cURL";
    }, 1600);
  } catch {
    copyButton.textContent = "Select and copy";
  }
});
