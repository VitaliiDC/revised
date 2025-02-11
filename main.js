document.getElementById("fileInput").addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const htmlContent = e.target.result;
        const regex = /[A-Za-z]{2}\d{5}/;

        // Парсимо HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, "text/html");
        window.doc = doc;
        
        let arr = doc.querySelectorAll(".text");
        arr = Array.from(arr);

        arr = arr.filter(e => e.innerText.toLowerCase().includes("revised"))
        .map(e => e.innerText.match(regex));
        arr = arr.map(e => e && e[0].toUpperCase()).filter(e => e != null);

        let output = arr.join("</p><p>");

        document.getElementById("content").innerHTML = `<p>${output}</p>`;
      };
      reader.readAsText(file);
    }
  });
  
