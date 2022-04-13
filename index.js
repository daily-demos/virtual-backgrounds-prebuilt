let callFrame;

const backgroundPrefix = "backgrounds";
const backgroundsData = [
    {
        path: "cafe-table-with-coffee.jpg",
        alt: "A round coffee table with a cup of coffee",
    },
    {
        path: "northern-lights.jpg",
        alt: "Northern lights",
    },
    {
        path: "outdoor-cafe-with-cat.jpg",
        alt: "An outdoor cafe with a cat",
    },
    {
        path: "rocky-forest.jpg",
        alt: "A rocky forest",
    },
    {
        path: "snowy-mountains.jpg",
        alt: "Snowy mountains",
    },
    {
        path: "sunny-beach.jpg",
        alt: "A sunny beach",
    },
    {
        path: "warm-restaurant.jpg",
        alt: "A warm restaurant",
    },
];

window.addEventListener("DOMContentLoaded", () => {
  initCall();
  initBackgrounds();
});

function initBackgrounds() {
    const backgrounds = document.getElementById("backgrounds");
    const resetBtn = backgrounds.getElementsByTagName("button")[0];
    resetBtn.onclick = () => {
      resetBackground();
    };
    loadBackgrounds();
}

function initCall() {
  const container = document.getElementById("call");

  callFrame = DailyIframe.createFrame(container, {
    showLeaveButton: true,
    iframeStyle: {
      position: "fixed",
      width: "500px",
      height: "550px",
    },
  })
    .on("nonfatal-error", (e) => {
      console.warn("nonfatal error:", e);
    })
    .on("started-camera", () => {
        const backgrounds = document.getElementById("backgrounds");
        backgrounds.classList.remove("hidden");
    })
    .on("left-meeting", () => {
      initCall();
    });

  // TODO: Replace the following URL with your own room URL.
 // callFrame.join({ url: "https://lizashul.daily.co/testing3"});
 callFrame.join({url:"https://khk-local.wss.daily.co:8000/hi?domain=liza&customHost=khk-local.wss.daily.co:8000"})
}

function setBackground(data) {   
    callFrame.updateInputSettings({
      video: {
        processor: {
          type: "background-image",
          config: {
            source: data,
          },
        },
      },
    });
}  

function resetBackground() {
    callFrame.updateInputSettings({
        video: {
          processor: {
            type: "none",
          },
        },
      });
}

async function loadBackgrounds() {
    const bgImages = document.getElementById("bgImages");

    for (let i = 0; i < backgroundsData.length; i++) {
        const data = backgroundsData[i];
        const imgPath = `${window.location.protocol}//${window.location.host}/${backgroundPrefix}/${data.path}`;

        const img = document.createElement("img");
        img.src = imgPath;

        const blob = await fetch(imgPath)
        .then((res) => {
            return res.blob();
        }).then((blob) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            return new Promise(resolve => {
                reader.onloadend = () => {
                resolve(reader.result);
                };
            });
        })
        .catch((err) => {
            console.error("failed to fetch background image:", err);
        });

        img.onclick = () => {
          setBackground(blob);
        };
        img.alt = data.alt;
        bgImages.appendChild(img);
    }
  
}

