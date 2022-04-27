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
  callFrame.join({ url: "https://<your-domain>.daily.co/<room-name>" });
}

function setBackground(imgPath) {
  callFrame.updateInputSettings({
    video: {
      processor: {
        type: "background-image",
        config: {
          source: imgPath,
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

    img.onclick = () => {
      setBackground(imgPath);
    };
    img.alt = data.alt;
    bgImages.appendChild(img);
  }
}
