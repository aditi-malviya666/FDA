const pptxgen = require("pptxgenjs");
const path = require("node:path");

(async () => {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.title = "Plant Leaf Disease Detection – Technical Report";

  // ─── PALETTE (matching existing deck) ────────────────────────────────────────
  const C = {
    dark:    "1B3D2F",
    mid:     "2D6A4F",
    teal:    "3D9970",
    mint:    "D8F3DC",
    white:   "FFFFFF",
    offW:    "F0FAF3",
    gold:    "F4A261",
    red:     "E76F51",
    gray:    "5C5C5C",
    lightGr: "B7E4C7",
    cardBg:  "FFFFFF",
    tablHdr: "1B3D2F",
  };

  // ─── HELPERS ──────────────────────────────────────────────────────────────────
  function darkSlide(slide) {
    slide.background = { color: C.dark };
  }
  function lightSlide(slide) {
    slide.background = { color: C.offW };
  }
  function slideNum(slide, n) {
    slide.addText(String(n).padStart(2,"0"), {
      x: 9.0, y: 0.18, w: 0.7, h: 0.35,
      fontSize: 12, color: C.teal, bold: true, align: "right", margin: 0
    });
  }
  function sectionTitle(slide, title, isDark = false) {
    slide.addText(title, {
      x: 0.4, y: 0.15, w: 8.6, h: 0.5,
      fontSize: 22, fontFace: "Calibri", bold: true,
      color: isDark ? C.white : C.dark, align: "left", margin: 0
    });
    slide.addShape(pres.shapes.RECTANGLE, {
      x: 0.4, y: 0.66, w: 9.2, h: 0.03,
      fill: { color: isDark ? C.teal : C.mid }, line: { color: isDark ? C.teal : C.mid }
    });
  }
  function card(slide, x, y, w, h, opts = {}) {
    slide.addShape(pres.shapes.RECTANGLE, {
      x, y, w, h,
      fill: { color: opts.bg || C.cardBg },
      line: { color: opts.border || C.lightGr, width: 1 },
      shadow: { type: "outer", color: "000000", blur: 5, offset: 2, angle: 135, opacity: 0.08 }
    });
  }
  function iconCircle(slide, x, y, color, emoji) {
    slide.addShape(pres.shapes.OVAL, {
      x, y, w: 0.38, h: 0.38,
      fill: { color }, line: { color }
    });
    slide.addText(emoji, { x, y: y - 0.02, w: 0.38, h: 0.42, fontSize: 14, align: "center", margin: 0 });
  }
  function statBox(slide, x, y, value, label, valColor) {
    card(slide, x, y, 2.1, 0.95, { bg: C.white });
    slide.addText(value, {
      x: x + 0.05, y: y + 0.05, w: 2.0, h: 0.5,
      fontSize: 26, fontFace: "Calibri", bold: true, color: valColor || C.teal, align: "center", margin: 0
    });
    slide.addText(label, {
      x: x + 0.05, y: y + 0.55, w: 2.0, h: 0.32,
      fontSize: 9, color: C.gray, align: "center", margin: 0
    });
  }

  // ══════════════════════════════════════════════════════════════════════════════
  // SLIDE 1 – TITLE (dark)
  // ══════════════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    darkSlide(s);

    // Big decorative circle top-right
    s.addShape(pres.shapes.OVAL, {
      x: 7.8, y: -1.2, w: 3.5, h: 3.5,
      fill: { color: C.mid, transparency: 60 },
      line: { color: C.mid, transparency: 60 }
    });
    s.addShape(pres.shapes.OVAL, {
      x: 8.5, y: -0.5, w: 2.0, h: 2.0,
      fill: { color: C.teal, transparency: 50 },
      line: { color: C.teal, transparency: 50 }
    });

    // Main title
    s.addText("Plant Leaf Disease Detection", {
      x: 0.4, y: 0.55, w: 7.5, h: 0.7,
      fontSize: 30, bold: true, color: C.white, fontFace: "Calibri", margin: 0
    });
    s.addText("Using MobileNetV3 Integrated with Federated Learning", {
      x: 0.4, y: 1.2, w: 7.5, h: 0.45,
      fontSize: 16, color: C.mint, fontFace: "Calibri", italic: true, margin: 0
    });
    s.addText("Technical Report — Challenges, Design Decisions & Experimental Insights", {
      x: 0.4, y: 1.62, w: 7.5, h: 0.3,
      fontSize: 11, color: C.lightGr, fontFace: "Calibri", margin: 0
    });

    // Authors
    s.addText("Aditi Malviya · Vishal Kushwaha · Keshav Khandelwal · Anshika Shroff · Mohan Chauhan", {
      x: 0.4, y: 2.05, w: 9.2, h: 0.3,
      fontSize: 11, color: C.lightGr, margin: 0
    });
    s.addText("Supervisor: Ms. Shivani Kumari  |  Dept. of CSE, Faculty of Technology, University of Delhi", {
      x: 0.4, y: 2.32, w: 9.2, h: 0.25,
      fontSize: 10, color: C.teal, margin: 0
    });

    // Stat boxes
    const stats = [
      ["98.70%", "Classification\nAccuracy", C.teal],
      ["4.2M",   "Model\nParameters",        C.teal],
      ["38",     "Disease\nClasses",          C.teal],
      ["54,303", "Training\nImages",          C.teal],
    ];
    stats.forEach(([v, l, col], i) => statBox(s, 0.4 + i * 2.28, 2.85, v, l, col));

    // Footer
    s.addText("Department of Computer Science & Engineering, University of Delhi  |  Academic Year 2025–2026", {
      x: 0.4, y: 5.1, w: 9.2, h: 0.28,
      fontSize: 9, color: C.lightGr, align: "center", margin: 0
    });
  }

  // ══════════════════════════════════════════════════════════════════════════════
  // SLIDE 2 – Introduction & Motivation
  // ══════════════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    lightSlide(s);
    slideNum(s, "01");
    sectionTitle(s, "Introduction & Motivation");

    // Left column — text blocks
    const points = [
      ["🌾", C.mid,  "Agriculture & Food Security",
       "Agriculture is the backbone of developing economies. India has over 58% of rural population dependent on farming, making crop health critical to national food security."],
      ["⚠️", C.red,  "Scale of Crop Loss",
       "Plant diseases cause an estimated 20–30% annual crop loss globally, translating to billions of dollars in economic damage and threatening food availability."],
      ["☁️", C.gray, "Failure of Centralized ML",
       "Dominant centralized learning requires uploading sensitive crop images to external cloud servers — impractical where internet connectivity is unreliable and data privacy is a concern."],
      ["🔗", C.teal, "Our Solution",
       "Combining Federated Learning (FL) with the lightweight MobileNetV3 architecture enables collaborative model training without transferring raw image data off-device."],
    ];

    points.forEach(([icon, col, heading, body], i) => {
      const y = 0.82 + i * 1.12;
      card(s, 0.35, y, 5.85, 0.98, { bg: C.white });
      s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y, w: 0.07, h: 0.98, fill: { color: col }, line: { color: col } });
      s.addText(icon + "  " + heading, { x: 0.55, y: y + 0.06, w: 5.5, h: 0.28, fontSize: 13, bold: true, color: C.dark, margin: 0 });
      s.addText(body, { x: 0.55, y: y + 0.34, w: 5.5, h: 0.56, fontSize: 10, color: C.gray, margin: 0 });
    });

    // Right column — key stats callouts
    const callouts = [
      ["20–30%",  "crop loss worldwide\nfrom plant disease", C.teal],
      ["58%+",    "of India's rural pop.\ndependent on farming", C.mid],
      ["$Billions","in annual economic\ndamage from disease",  C.red],
      ["0 MB",    "raw data transmitted\nin federated learning", C.teal],
    ];
    callouts.forEach(([val, lbl, col], i) => {
      const y = 0.82 + i * 1.12;
      card(s, 6.45, y, 3.15, 0.98, { bg: C.mint, border: C.lightGr });
      s.addText(val, { x: 6.50, y: y + 0.06, w: 3.05, h: 0.46, fontSize: 22, bold: true, color: col, align: "center", margin: 0 });
      s.addText(lbl, { x: 6.50, y: y + 0.54, w: 3.05, h: 0.36, fontSize: 10, color: C.dark, align: "center", margin: 0 });
    });
  }

  // ══════════════════════════════════════════════════════════════════════════════
  // SLIDE 3 – Core Challenges
  // ══════════════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    lightSlide(s);
    slideNum(s, "02");
    sectionTitle(s, "Problem Statement & Core Challenges");

    const challenges = [
      ["01", C.teal, "Non-IID Data Distribution",
       "Different farms grow different crops. Client data is inherently non-identically distributed (Non-IID), degrading FedAvg aggregation. A Punjab wheat farmer's model differs from an Andhra tomato farmer's."],
      ["02", C.mid,  "Communication Overhead",
       "MobileNetV3's 4.2M parameters produce a 16.47 MB payload per client per round. In rural areas with <1 Mbps bandwidth, this is significant. Handling dropout mid-transmission remains unresolved."],
      ["03", C.gold, "Model Selection for Edge Devices",
       "VGG16 (528 MB) and ResNet50 (98 MB) were ruled out. MobileNetV3 selected over EfficientNetB0 for lower FLOPs (233M vs 390M), SE blocks, and HardSwish activation optimized for mobile CPUs."],
      ["04", C.red,  "Privacy–Accuracy Trade-off",
       "Standard FedAvg without Differential Privacy achieves 98.70% accuracy but is vulnerable to model inversion attacks. Adding Gaussian DP noise typically degrades accuracy by 3–8%."],
    ];

    // 2×2 grid
    const positions = [[0.35, 0.82], [5.1, 0.82], [0.35, 2.9], [5.1, 2.9]];
    challenges.forEach(([num, col, title, body], i) => {
      const [x, y] = positions[i];
      card(s, x, y, 4.6, 1.9, { bg: C.white });
      // Number badge
      s.addShape(pres.shapes.OVAL, { x: x + 0.15, y: y + 0.15, w: 0.42, h: 0.42, fill: { color: col }, line: { color: col } });
      s.addText(num, { x: x + 0.15, y: y + 0.15, w: 0.42, h: 0.42, fontSize: 13, bold: true, color: C.white, align: "center", valign: "middle", margin: 0 });
      s.addText(title, { x: x + 0.7, y: y + 0.16, w: 3.75, h: 0.35, fontSize: 13, bold: true, color: C.dark, margin: 0 });
      s.addText(body,  { x: x + 0.15, y: y + 0.62, w: 4.3, h: 1.15, fontSize: 10, color: C.gray, margin: 0 });
    });

    // Bottom note
    s.addText("Why Centralized Learning Fails: bandwidth bottlenecks · data ownership loss · single point of failure · non-linear scalability limits", {
      x: 0.35, y: 5.0, w: 9.3, h: 0.3,
      fontSize: 9, color: C.mid, align: "center", italic: true, margin: 0
    });
  }

  // ══════════════════════════════════════════════════════════════════════════════
  // SLIDE 4 – Dataset Challenges
  // ══════════════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    lightSlide(s);
    slideNum(s, "03");
    sectionTitle(s, "Dataset Challenges & Pre-Processing");

    // Limitations block (left)
    card(s, 0.35, 0.82, 4.6, 2.2, { bg: C.white });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 0.82, w: 4.6, h: 0.38, fill: { color: C.dark }, line: { color: C.dark } });
    s.addText("⚠️  PlantVillage Dataset Limitations", { x: 0.45, y: 0.82, w: 4.4, h: 0.38, fontSize: 12, bold: true, color: C.white, valign: "middle", margin: 0 });

    const lims = [
      "Lab-controlled images: uniform lighting, clean backgrounds, isolated leaves",
      "Real fields have cluttered backgrounds, partial occlusion, shadows, motion blur",
      "Severe class imbalance: Tomato = 18,160 images vs Cherry = 1,875 images",
      "Models trained here tend to overestimate real-world generalization",
    ];
    lims.forEach((l, i) => {
      s.addText("▸  " + l, { x: 0.5, y: 1.26 + i * 0.41, w: 4.35, h: 0.36, fontSize: 10, color: C.dark, margin: 0 });
    });

    // Crop distribution table (right)
    card(s, 5.1, 0.82, 4.5, 2.2, { bg: C.white });
    s.addShape(pres.shapes.RECTANGLE, { x: 5.1, y: 0.82, w: 4.5, h: 0.38, fill: { color: C.mid }, line: { color: C.mid } });
    s.addText("Crop-wise Data Distribution", { x: 5.2, y: 0.82, w: 4.3, h: 0.38, fontSize: 12, bold: true, color: C.white, valign: "middle", margin: 0 });

    const crops = [["Tomato","10","18,160"],["Grape","4","4,062"],["Corn","4","3,852"],["Apple","4","3,171"],["Pepper","2","2,476"],["Potato","3","2,152"],["Cherry","2","1,875"]];
    const hdrOpts = { fill: { color: C.dark }, color: C.white, bold: true };
    s.addTable(
      [[{ text: "Crop", options: hdrOpts }, { text: "Classes", options: hdrOpts }, { text: "Images", options: hdrOpts }],
       ...crops.map(([c,cl,im]) => [c, cl, im])],
      { x: 5.15, y: 1.22, w: 4.4, h: 1.72, fontSize: 10, border: { pt: 0.5, color: C.lightGr },
        fill: { color: C.white }, colW: [1.8, 1.2, 1.4] }
    );

    // Pre-processing pipeline (bottom)
    card(s, 0.35, 3.15, 9.25, 2.15, { bg: C.white });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 3.15, w: 9.25, h: 0.38, fill: { color: C.teal }, line: { color: C.teal } });
    s.addText("Data Pre-Processing Pipeline", { x: 0.5, y: 3.15, w: 9.0, h: 0.38, fontSize: 12, bold: true, color: C.white, valign: "middle", margin: 0 });

    const steps = [
      ["1", "Resize to\n224×224 px", "Matches ImageNet-\npretrained weights"],
      ["2", "ImageNet\nNormalization", "mean=[0.485,0.456,0.406]\nstd=[0.229,0.224,0.225]"],
      ["3", "Convert to\nPyTorch Tensor", "For model\ntraining input"],
      ["4", "Data\nAugmentation", "Random flip, ±15° rot,\nbrightness & contrast jitter"],
    ];

    steps.forEach(([num, title, desc], i) => {
      const x = 0.5 + i * 2.3;
      s.addShape(pres.shapes.OVAL, { x: x, y: 3.62, w: 0.38, h: 0.38, fill: { color: C.teal }, line: { color: C.teal } });
      s.addText(num, { x: x, y: 3.62, w: 0.38, h: 0.38, fontSize: 12, bold: true, color: C.white, align: "center", valign: "middle", margin: 0 });
      s.addText(title, { x: x - 0.3, y: 4.04, w: 1.8, h: 0.35, fontSize: 10, bold: true, color: C.dark, align: "center", margin: 0 });
      s.addText(desc,  { x: x - 0.3, y: 4.38, w: 1.8, h: 0.5, fontSize: 9, color: C.gray, align: "center", margin: 0 });
      // Arrow between steps
      if (i < 3) s.addShape(pres.shapes.LINE, { x: x + 1.15, y: 3.81, w: 0.7, h: 0, line: { color: C.teal, width: 1.5 } });
    });

    s.addText("Federated Split: Client 1 = Colored Dataset (54,303) | Client 2 = Segmented Dataset (54,303)", {
      x: 0.35, y: 5.0, w: 9.3, h: 0.25, fontSize: 9, color: C.mid, italic: true, align: "center", margin: 0
    });
  }

  // ══════════════════════════════════════════════════════════════════════════════
  // SLIDE 5 – System Architecture Challenges
  // ══════════════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    lightSlide(s);
    slideNum(s, "04");
    sectionTitle(s, "System Architecture Challenges");

    const blocks = [
      { col: C.teal, icon: "🖥️", title: "Flask Server Design", items: [
        "HTTP is stateless; FL is inherently stateful — required global variables + thread locks",
        "PyTorch tensors cannot be JSON-serialized; NumPy → byte stream conversion needed",
        "Client dropout handling: server assumes 100% participation (brittle in practice)",
      ]},
      { col: C.mid, icon: "⚙️", title: "FedAvg Implementation", items: [
        "Batch normalization running stats (mean & variance) must be averaged separately",
        "Integer-type buffers cannot be weighted-averaged — require special handling",
        "Early versions omitted BN buffers → incorrect batch statistics during inference",
      ]},
      { col: C.gold, icon: "📊", title: "Streamlit Dashboard", items: [
        "Full-page rerender on every interaction → live training visualization is difficult",
        "REST API calls to Flask backend add observable latency to the UI",
        "Desktop-first layout required custom CSS overrides for mobile (farmer) use",
      ]},
      { col: C.red, icon: "☁️", title: "Render Platform Deployment", items: [
        "Cold start delays — Render suspends free-tier services after inactivity",
        "512 MB RAM ceiling insufficient for MobileNetV3 + Flask → lazy loading required",
        "No persistent storage — model weights must reload from repo on each container start",
      ]},
    ];

    const positions = [[0.35, 0.82],[5.1, 0.82],[0.35, 3.0],[5.1, 3.0]];
    blocks.forEach(({ col, icon, title, items }, i) => {
      const [x, y] = positions[i];
      card(s, x, y, 4.6, 2.0, { bg: C.white });
      s.addShape(pres.shapes.RECTANGLE, { x: x, y: y, w: 4.6, h: 0.36, fill: { color: col }, line: { color: col } });
      s.addText(icon + "  " + title, { x: x + 0.1, y: y, w: 4.4, h: 0.36, fontSize: 12, bold: true, color: C.white, valign: "middle", margin: 0 });
      items.forEach((item, j) => {
        s.addText([{ text: "▸  " + item, options: {} }], {
          x: x + 0.1, y: y + 0.42 + j * 0.48, w: 4.35, h: 0.44, fontSize: 10, color: C.dark, margin: 0
        });
      });
    });

    s.addText("Key Insight: Federated learning is substantially harder to implement correctly than centralized learning — distributed nature introduces new bug categories, bottlenecks, and vulnerabilities.", {
      x: 0.35, y: 5.05, w: 9.3, h: 0.28, fontSize: 9, color: C.mid, italic: true, align: "center", margin: 0
    });
  }

  // ══════════════════════════════════════════════════════════════════════════════
  // SLIDE 6 – Model Training Challenges & Performance
  // ══════════════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    lightSlide(s);
    slideNum(s, "05");
    sectionTitle(s, "Model Training Challenges");

    // Hardware constraints (left)
    card(s, 0.35, 0.82, 4.6, 2.4, { bg: C.white });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 0.82, w: 4.6, h: 0.38, fill: { color: C.dark }, line: { color: C.dark } });
    s.addText("🖥️  Hardware Constraints", { x: 0.45, y: 0.82, w: 4.4, h: 0.38, fontSize: 12, bold: true, color: C.white, valign: "middle", margin: 0 });

    const hwItems = [
      ["Node 1", "Intel Core i7-1355U (13th Gen), 16 GB RAM, Windows 11"],
      ["Node 2", "Intel Core i5-1340P (13th Gen), 16 GB RAM, Windows 11"],
      ["Training Time", "4–8 hours per client per round on CPU-only machines"],
      ["Consequence", "Only 1 FL round completed; batch size capped at 32; FP16 not explored"],
    ];
    hwItems.forEach(([lbl, val], i) => {
      s.addText(lbl + ":", { x: 0.45, y: 1.26 + i * 0.47, w: 1.3, h: 0.4, fontSize: 10, bold: true, color: C.mid, margin: 0 });
      s.addText(val, { x: 1.72, y: 1.26 + i * 0.47, w: 3.1, h: 0.4, fontSize: 10, color: C.dark, margin: 0 });
    });

    // Per-class failures (right)
    card(s, 5.1, 0.82, 4.5, 2.4, { bg: C.white });
    s.addShape(pres.shapes.RECTANGLE, { x: 5.1, y: 0.82, w: 4.5, h: 0.38, fill: { color: C.red }, line: { color: C.red } });
    s.addText("📉  Per-Class Performance Anomalies", { x: 5.2, y: 0.82, w: 4.3, h: 0.38, fontSize: 12, bold: true, color: C.white, valign: "middle", margin: 0 });

    const failClasses = [
      ["Tomato Early Blight",   "80.00%", "Similar to Late Blight lesions"],
      ["Corn Cercospora Spot",  "76.19%", "Background removal helps: 90.91% segmented"],
      ["Potato Healthy",        "83.33%", "Misclassified as early-stage disease"],
      ["Cherry Healthy",        "93.75%", "Low inter-class visual difference"],
    ];
    failClasses.forEach(([cls, acc, reason], i) => {
      card(s, 5.15, 1.26 + i * 0.47, 4.4, 0.42, { bg: C.mint, border: C.lightGr });
      s.addText(cls, { x: 5.22, y: 1.28 + i * 0.47, w: 1.7, h: 0.36, fontSize: 10, bold: true, color: C.dark, margin: 0 });
      s.addText(acc, { x: 6.95, y: 1.28 + i * 0.47, w: 0.65, h: 0.36, fontSize: 10, bold: true, color: C.red, align: "center", margin: 0 });
      s.addText(reason, { x: 7.6, y: 1.28 + i * 0.47, w: 1.9, h: 0.36, fontSize: 9, color: C.gray, margin: 0 });
    });

    // Bottom: FedAvg pseudocode card
    card(s, 0.35, 3.35, 9.25, 1.85, { bg: "F8FFF9" });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 3.35, w: 9.25, h: 0.36, fill: { color: C.mid }, line: { color: C.mid } });
    s.addText("FedAvg Algorithm (as implemented)", { x: 0.5, y: 3.35, w: 9.0, h: 0.36, fontSize: 12, bold: true, color: C.white, valign: "middle", margin: 0 });

    s.addText([
      { text: "1. ", options: { bold: true, color: C.teal } }, { text: "n ← Σᵢ N[i]   ", options: { color: C.dark } },
      { text: "2. ", options: { bold: true, color: C.teal } }, { text: "For each key k in W[0]:   ", options: { color: C.dark } },
      { text: "3. ", options: { bold: true, color: C.teal } }, { text: "temp ← Σᵢ W[i][k] · N[i]   ", options: { color: C.dark } },
      { text: "4. ", options: { bold: true, color: C.teal } }, { text: "w_global[k] ← temp / n   ", options: { color: C.dark } },
      { text: "Note: ", options: { bold: true, color: C.red } }, { text: "Batch norm running stats (mean & var) must be averaged separately from trainable weights.", options: { color: C.gray, italic: true } },
    ], { x: 0.5, y: 3.75, w: 9.0, h: 1.32, fontSize: 11, margin: 0 });
  }

  // ══════════════════════════════════════════════════════════════════════════════
  // SLIDE 7 – Privacy & Security Challenges
  // ══════════════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    lightSlide(s);
    slideNum(s, "06");
    sectionTitle(s, "Privacy & Security Challenges");

    const threats = [
      { col: C.red, icon: "🔓", title: "Absence of Differential Privacy",
        body: "Without DP, model gradients shared during FL rounds can leak training data via gradient inversion attacks. An attacker observes ΔW = W_local − W_global and reconstructs input images. Adding Gaussian noise N(0,σ²I) prevents this but incurs 3–8% accuracy penalty. Deliberately omitted for this semester project.",
        badge: "Critical Gap" },
      { col: C.gold, icon: "🚫", title: "No Client Authentication",
        body: "Flask server accepts updates from any connecting client without authentication. Vulnerabilities include: denial-of-service via garbage updates, Byzantine attacks with crafted poisoning updates, and client impersonation. JWT or certificate-based mutual authentication identified as required future addition.",
        badge: "High Risk" },
      { col: C.mid, icon: "©️", title: "Model Intellectual Property",
        body: "Global model weights are distributed to all clients at the start of each round, enabling any client to extract the model for unauthorized commercial use. Model watermarking techniques for redistribution tracing were identified but not implemented within the project scope.",
        badge: "Medium Risk" },
    ];

    threats.forEach(({ col, icon, title, body, badge }, i) => {
      const y = 0.82 + i * 1.55;
      card(s, 0.35, y, 9.25, 1.42, { bg: C.white });
      s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y, w: 0.07, h: 1.42, fill: { color: col }, line: { color: col } });
      // Badge
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 8.4, y: y + 0.12, w: 1.1, h: 0.3, fill: { color: col }, line: { color: col }, rectRadius: 0.05 });
      s.addText(badge, { x: 8.4, y: y + 0.12, w: 1.1, h: 0.3, fontSize: 9, bold: true, color: C.white, align: "center", valign: "middle", margin: 0 });
      s.addText(icon + "  " + title, { x: 0.55, y: y + 0.1, w: 7.7, h: 0.32, fontSize: 13, bold: true, color: C.dark, margin: 0 });
      s.addText(body, { x: 0.55, y: y + 0.46, w: 8.6, h: 0.86, fontSize: 10, color: C.gray, margin: 0 });
    });

    s.addText("Privacy–Accuracy Trade-off: Standard FedAvg achieves 98.70% accuracy. Differential Privacy integration (DP-SGD) remains essential for any production deployment.", {
      x: 0.35, y: 5.08, w: 9.3, h: 0.25, fontSize: 9, color: C.red, italic: true, align: "center", margin: 0
    });
  }

  // ══════════════════════════════════════════════════════════════════════════════
  // SLIDE 8 – Evaluation & Results
  // ══════════════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    lightSlide(s);
    slideNum(s, "07");
    sectionTitle(s, "Evaluation & Results Analysis");

    // Top metric boxes
    const metrics = [
      ["98.70%", "Overall\nAccuracy", C.teal],
      ["0.97",   "Precision",        C.mid],
      ["0.99",   "Recall",           C.teal],
      ["0.98",   "F1-Score",         C.mid],
    ];
    metrics.forEach(([v, l, col], i) => {
      statBox(s, 0.35 + i * 2.38, 0.82, v, l, col);
    });

    // SOTA comparison table
    card(s, 0.35, 2.0, 5.55, 3.2, { bg: C.white });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 2.0, w: 5.55, h: 0.36, fill: { color: C.dark }, line: { color: C.dark } });
    s.addText("Comparison with State-of-the-Art", { x: 0.45, y: 2.0, w: 5.35, h: 0.36, fontSize: 12, bold: true, color: C.white, valign: "middle", margin: 0 });

    const sota = [
      ["Francis & Deisy (2019)",  "CNN Centralized",   "87.00%","No","No"],
      ["Basavaiah (2020)",         "Random Forest",     "94.00%","No","No"],
      ["Chakravarthy (2020)",      "ResNet+Xception",   "97.95%","No","No"],
      ["Kumari (2019)",            "CNN Centralized",   "98.00%","No","No"],
      ["Amna et al. (2025)",       "EfficientNet-FL",   "93.00%","Yes","Partial"],
      ["Proposed (2025) ★",        "FL-MobileNetV3",    "98.70%","Yes ✓","Yes ✓"],
    ];
    const hdr = { fill: { color: C.mid }, color: C.white, bold: true };
    s.addTable(
      [[{ text:"Reference",options:hdr},{text:"Method",options:hdr},{text:"Acc.",options:hdr},{text:"Privacy",options:hdr},{text:"Edge",options:hdr}],
       ...sota.map((row, i) => row.map((cell) => ({
         text: cell,
         options: i === sota.length - 1 ? { bold: true, fill: { color: C.mint } } : {}
       })))
      ],
      { x: 0.4, y: 2.4, w: 5.45, h: 2.72, fontSize: 9.5, border: { pt: 0.5, color: C.lightGr },
        fill: { color: C.white }, colW: [2.0, 1.4, 0.7, 0.75, 0.6] }
    );

    // Right: colored vs segmented + confusion matrix insight
    card(s, 6.1, 2.0, 3.5, 1.45, { bg: C.mint });
    s.addText("Colored vs. Segmented Dataset", { x: 6.2, y: 2.06, w: 3.3, h: 0.3, fontSize: 11, bold: true, color: C.dark, margin: 0 });
    const cmp = [["Accuracy","97.65%","97.95%"],["Avg Confidence","0.9784","0.9829"],["Confidence SD","0.0806","0.0746"]];
    s.addTable(
      [[{text:"Metric",options:{ bold:true }},{text:"Colored",options:{ bold:true }},{text:"Segmented",options:{ bold:true }}],
       ...cmp],
      { x: 6.15, y: 2.38, w: 3.4, h: 0.98, fontSize: 9, border: { pt: 0.5, color: C.lightGr }, fill: { color: C.white }, colW: [1.4, 1.0, 1.0] }
    );

    card(s, 6.1, 3.55, 3.5, 1.62, { bg: C.white });
    s.addShape(pres.shapes.RECTANGLE, { x: 6.1, y: 3.55, w: 3.5, h: 0.34, fill: { color: C.mid }, line: { color: C.mid } });
    s.addText("Confusion Matrix Insight", { x: 6.2, y: 3.55, w: 3.3, h: 0.34, fontSize: 11, bold: true, color: C.white, valign: "middle", margin: 0 });
    s.addText("Misclassifications cluster around visually similar disease pairs:\n\n• Tomato Early Blight ↔ Tomato Late Blight\n• Corn Cercospora ↔ Corn N. Leaf Blight\n\nErrors are biologically interpretable — not arbitrary.", {
      x: 6.18, y: 3.94, w: 3.35, h: 1.15, fontSize: 10, color: C.dark, margin: 0
    });

    s.addText("Strong 38×38 diagonal in confusion matrix — model errors align with conditions that even trained pathologists occasionally confuse.", {
      x: 0.35, y: 5.08, w: 9.3, h: 0.25, fontSize: 9, color: C.mid, italic: true, align: "center", margin: 0
    });
  }

  // ══════════════════════════════════════════════════════════════════════════════
  // SLIDE 9 – Ethical Considerations & UI Challenges
  // ══════════════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    lightSlide(s);
    slideNum(s, "08");
    sectionTitle(s, "Ethical Considerations & UI Challenges");

    // Ethical considerations (left column)
    const ethics = [
      { col: C.red,  icon: "⚕️", title: "Misdiagnosis Risk",
        body: "False negative → farmer delays treatment → significant crop loss. False positive → unnecessary pesticide expenditure. System displays disclaimer but farmers in remote areas may act on AI output alone." },
      { col: C.gold, icon: "🔐", title: "Data Sovereignty & Consent",
        body: "FL preserves raw data privacy technically, but raises open questions: What information is extracted via model updates? Can farm disease profiles be inferred? Who owns the global model?" },
      { col: C.mid,  icon: "⚖️", title: "Algorithmic Bias",
        body: "18,160 tomato vs. 1,875 cherry images → model is more accurate for tomato than cherry. Farmers growing underrepresented crops receive systematically less reliable diagnoses — a form of algorithmic inequity." },
    ];

    ethics.forEach(({ col, icon, title, body }, i) => {
      const y = 0.82 + i * 1.48;
      card(s, 0.35, y, 5.0, 1.35, { bg: C.white });
      s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y, w: 0.07, h: 1.35, fill: { color: col }, line: { color: col } });
      s.addText(icon + "  " + title, { x: 0.54, y: y + 0.1, w: 4.7, h: 0.3, fontSize: 12, bold: true, color: C.dark, margin: 0 });
      s.addText(body, { x: 0.54, y: y + 0.44, w: 4.7, h: 0.84, fontSize: 10, color: C.gray, margin: 0 });
    });

    // UI challenges (right column)
    card(s, 5.55, 0.82, 4.05, 4.4, { bg: C.white });
    s.addShape(pres.shapes.RECTANGLE, { x: 5.55, y: 0.82, w: 4.05, h: 0.38, fill: { color: C.teal }, line: { color: C.teal } });
    s.addText("📱  UI & Usability Challenges", { x: 5.65, y: 0.82, w: 3.85, h: 0.38, fontSize: 12, bold: true, color: C.white, valign: "middle", margin: 0 });

    const uiItems = [
      ["Non-Technical Users", "Farmers with limited digital literacy — confidence scores like '80% Tomato Early Blight' may be misinterpreted. Users expect binary disease-or-healthy output."],
      ["Language Barrier", "Interface is English-only. Most target users prefer regional languages: Hindi, Telugu, Tamil, Marathi, Punjabi."],
      ["Generic Treatment Advice", "Displays generic recommendations rather than actionable guidance (specific fungicide names, application rates, timing). Domain expert input required."],
      ["Dashboard Complexity", "AgriVerse integrates 6 modules (crop yield, irrigation, soil, weather, schemes, marketplace) in one Streamlit app — causing slow loads & inconsistent UX."],
    ];

    uiItems.forEach(([title, body], i) => {
      s.addText(title + ":", { x: 5.65, y: 1.28 + i * 0.97, w: 3.8, h: 0.28, fontSize: 11, bold: true, color: C.dark, margin: 0 });
      s.addText(body, { x: 5.65, y: 1.56 + i * 0.97, w: 3.8, h: 0.6, fontSize: 10, color: C.gray, margin: 0 });
      if (i < 3) s.addShape(pres.shapes.LINE, { x: 5.65, y: 2.22 + i * 0.97, w: 3.8, h: 0, line: { color: C.lightGr, width: 0.5 } });
    });

    s.addText("Disclaimer shown: \"AI predictions are for reference only. Always consult a local agricultural expert before applying chemical treatments.\"", {
      x: 0.35, y: 5.08, w: 9.3, h: 0.25, fontSize: 9, color: C.mid, italic: true, align: "center", margin: 0
    });
  }

  // ══════════════════════════════════════════════════════════════════════════════
  // SLIDE 10 – Limitations Summary
  // ══════════════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    lightSlide(s);
    slideNum(s, "09");
    sectionTitle(s, "Limitations Summary");

    const lims = [
      ["Only 2 Simulated Clients",    "Scale to 10–100 heterogeneous clients to test real Non-IID conditions"],
      ["PlantVillage Dataset Only",    "Collect real field image datasets from Indian farms under natural conditions"],
      ["No Differential Privacy",      "Implement DP-SGD with Gaussian mechanism; target ε < 8 (δ = 10⁻⁵)"],
      ["No Client Authentication",     "Add JWT-based mutual authentication to prevent Byzantine attacks"],
      ["CPU-Only Training",            "Deploy on GPU-enabled edge devices to enable multi-round FL"],
      ["English UI Only",              "Add regional language localization (Hindi, Telugu, Tamil, Marathi, Punjabi)"],
      ["Classification Only",          "Integrate leaf segmentation and actionable treatment guidance"],
      ["Single FL Round",              "Multi-round training with convergence tracking across rounds"],
      ["No Hardware Testing",          "Real smartphone deployment and evaluation on entry-level Android devices"],
      ["Generic Treatment Advice",     "Domain-expert-validated agronomic guidance with specific protocols"],
    ];

    // 2-column list
    const half = Math.ceil(lims.length / 2);
    lims.forEach(([lim, mitigation], i) => {
      const col = i < half ? 0 : 1;
      const row = i < half ? i : i - half;
      const x = col === 0 ? 0.35 : 5.1;
      const y = 0.82 + row * 0.87;
      card(s, x, y, 4.6, 0.80, { bg: C.white });
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.07, h: 0.80, fill: { color: C.red }, line: { color: C.red } });
      s.addText(lim, { x: x + 0.18, y: y + 0.06, w: 4.3, h: 0.28, fontSize: 11, bold: true, color: C.dark, margin: 0 });
      s.addText("→ " + mitigation, { x: x + 0.18, y: y + 0.36, w: 4.3, h: 0.36, fontSize: 9.5, color: C.gray, margin: 0 });
    });
  }

  // ══════════════════════════════════════════════════════════════════════════════
  // SLIDE 11 – Future Work (dark)
  // ══════════════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    darkSlide(s);
    slideNum(s, "10");
    sectionTitle(s, "Future Work", true);

    const futureItems = [
      { icon: "🔒", col: C.teal, title: "Advanced Privacy Mechanisms",
        body: "DP-SGD with adaptive gradient clipping + Secure Aggregation protocols. Target: ε < 8 (δ=10⁻⁵) while maintaining >95% accuracy." },
      { icon: "📸", col: C.gold, title: "Real-World Dataset Collection",
        body: "Field-captured plant images from Indian farms, annotated under natural lighting by domain experts. Crowdsource via agricultural extension services." },
      { icon: "🤝", col: C.mid,  title: "Personalized Federated Learning",
        body: "FedProx and Per-FedAvg algorithms allow clients to retain personalized models adapted to their specific crop mix while benefiting from global knowledge." },
      { icon: "🌦️", col: C.teal, title: "Multi-Modal Input Integration",
        body: "Combine leaf images with weather data, GPS-based disease prevalence maps, and soil health metrics for predictive disease risk alerts." },
      { icon: "📦", col: C.gold, title: "Model Compression",
        body: "INT8 post-training quantization reduces model from 16.47 MB → ~4 MB and inference from 117 ms → ~30 ms for entry-level Android smartphones." },
      { icon: "🌍", col: C.mid,  title: "Pilot Deployment",
        body: "Large-scale real-world trials with actual farmers in the field to validate performance under natural conditions and diverse crop environments." },
    ];

    const positions2 = [
      [0.35, 0.85],[3.55, 0.85],[6.75, 0.85],
      [0.35, 2.85],[3.55, 2.85],[6.75, 2.85],
    ];

    futureItems.forEach(({ icon, col, title, body }, i) => {
      const [x, y] = positions2[i];
      card(s, x, y, 3.05, 1.82, { bg: "1E4A38", border: col });
      s.addShape(pres.shapes.OVAL, { x: x + 0.12, y: y + 0.14, w: 0.45, h: 0.45, fill: { color: col }, line: { color: col } });
      s.addText(icon, { x: x + 0.12, y: y + 0.12, w: 0.45, h: 0.48, fontSize: 16, align: "center", valign: "middle", margin: 0 });
      s.addText(title, { x: x + 0.68, y: y + 0.16, w: 2.25, h: 0.38, fontSize: 11, bold: true, color: C.white, margin: 0 });
      s.addText(body, { x: x + 0.12, y: y + 0.64, w: 2.85, h: 1.1, fontSize: 9.5, color: C.lightGr, margin: 0 });
    });

    s.addText("These future directions address the primary limitations identified in this technical report, with a focus on real-world agricultural deployment across diverse regions of India.", {
      x: 0.35, y: 5.08, w: 9.3, h: 0.25, fontSize: 9, color: C.lightGr, italic: true, align: "center", margin: 0
    });
  }

  // ══════════════════════════════════════════════════════════════════════════════
  // SLIDE 12 – Conclusion (dark)
  // ══════════════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    darkSlide(s);
    slideNum(s, "11");

    // Decorative circles
    s.addShape(pres.shapes.OVAL, { x: 7.5, y: -0.8, w: 3.5, h: 3.5, fill: { color: C.mid, transparency: 70 }, line: { color: C.mid, transparency: 70 } });
    s.addShape(pres.shapes.OVAL, { x: -0.8, y: 3.5, w: 2.5, h: 2.5, fill: { color: C.teal, transparency: 60 }, line: { color: C.teal, transparency: 60 } });

    s.addText("Conclusion", { x: 0.4, y: 0.3, w: 9.2, h: 0.6, fontSize: 28, bold: true, color: C.white, fontFace: "Calibri", margin: 0 });

    const contributions = [
      "Lightweight federated learning is viable for privacy-preserving agricultural AI",
      "MobileNetV3 achieves 98.70% accuracy — competitive with centralized methods",
      "FL is substantially harder than centralized learning; distributed nature adds bug categories, bottlenecks, and security vulnerabilities",
      "CPU-only hardware was the single largest practical constraint during this project",
      "PlantVillage benchmark does not reflect real agricultural field conditions",
      "Privacy–accuracy trade-off is unresolved; Differential Privacy remains essential for production",
      "The project provides a solid foundation for future research and agricultural deployment",
    ];

    // Split into 2 columns of cards
    const half = 4;
    contributions.forEach((text, i) => {
      const col = i < half ? 0 : 1;
      const row = i < half ? i : i - half;
      const x = col === 0 ? 0.35 : 5.1;
      const y = 1.05 + row * 0.98;
      card(s, x, y, 4.55, 0.86, { bg: "1E4A38", border: C.mid });
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.07, h: 0.86, fill: { color: C.teal }, line: { color: C.teal } });
      s.addText(text, { x: x + 0.2, y: y + 0.1, w: 4.25, h: 0.68, fontSize: 11, color: C.white, margin: 0 });
    });

    s.addText("Thank You  |  Department of Computer Science & Engineering, University of Delhi  |  Academic Year 2025–2026", {
      x: 0.35, y: 5.12, w: 9.3, h: 0.26, fontSize: 9, color: C.lightGr, align: "center", italic: true, margin: 0
    });
  }

  // ─── WRITE ──────────────────────────────────────────────────────────────────
  // Keep the generated deck beside this script regardless of the working directory.
  await pres.writeFile({ fileName: path.join(__dirname, "PlantDisease_TechReport_Presentation.pptx") });
  console.log("Done");
})();