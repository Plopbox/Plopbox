# Fadi Helal — Personal Portfolio

My personal portfolio website. Built from scratch to reflect what I actually do: system validation, hardware/software integration, robotics, connectivity testing, and automation engineering. The goal was a site that feels technical and personal at the same time, not just another template with placeholder text.

Live at [plopbox.io](https://plopbox.io)

---

## What is in here

The site is a single-page HTML/CSS/JS project with no frameworks, no build tools, and no dependencies beyond a few lightweight libraries. Everything renders fast and works without a bundler.

```
Plopbox/
├── index.html      # Full site structure and content
├── style.css       # All styling, animations, responsive layout
├── script.js       # All interactive behaviour
└── assets/         # Images and static files
```

---

## Features worth mentioning

**Spotlight reveal layer** — moving the cursor around reveals hidden code snippets, circuit diagrams, sensor data, math equations, and robotics content embedded across the page. All of it is themed around my actual work: C++, Python, C#, Rust, ROS2, STM32, Kalman filters, IK solvers, LiDAR, UART/SPI/I2C, and more.

**Particle canvas** — animated background with connected particle nodes. Subtle, not distracting.

**Typed text** — rotating phrases in the hero that cycle through what I actually build, not generic buzzwords.

**Electrocution effect** — hovering over my name triggers a full electrocution sequence. The cursor turns into a stick figure that shakes, sparks bolts in all directions, flashes the screen, and switches between body and skeleton view just like classic cartoons. The whole thing stays active until you move the cursor away.

**Skill bars, counters, and scan lines** — all scroll-triggered with IntersectionObserver.

**3D tilt on service cards** — using vanilla-tilt for the depth effect on hover.

**Contact form** — connected to Formspree with a mailto fallback.

**Fully responsive** — tested down to 380px wide.

---

## Stack

| Layer | What I used |
|---|---|
| Markup | Semantic HTML5 |
| Styling | Pure CSS with custom properties |
| Interactivity | Vanilla JavaScript, no frameworks |
| Animations | CSS keyframes + requestAnimationFrame |
| Scroll effects | IntersectionObserver + AOS |
| Tilt effect | vanilla-tilt |
| Icons | Font Awesome 6 |
| Fonts | Inter + JetBrains Mono |
| Form backend | Formspree |
| Hosting | GitHub Pages |

---

## Running it locally

No build step needed. Just open the file directly or serve it with anything:

```bash
# Python (built-in)
python -m http.server 8080

# Node
npx serve .
```

Then open `http://localhost:8080` in your browser.

---

## Topics covered in the spotlight layer

The hidden items revealed by the cursor spotlight are pulled from my actual background and day-to-day work:

- **Embedded C/C++** — state machines, RAII, move semantics, STM32 register maps, RTOS patterns
- **Python** — async/await, type hints, protocols, dataclasses, TensorFlow, pytest fixtures and parametrize
- **C# / .NET** — async Tasks, LINQ pipelines, result types
- **Rust** — ownership model, borrowing, Arc/Mutex, iterator chains
- **Electronics** — NPN transistors, op-amps, H-bridges, LC filters, logic gates, CAN/SPI/I2C/UART frame diagrams
- **Robotics** — ROS2 publisher nodes, drone top-view, 6-DOF arm kinematics, FSM power states, quadrature encoders
- **Signal processing** — FFT, Kalman filter predict/update, Ziegler-Nichols PID tuning, oscilloscope waveforms
- **Math and physics** — Maxwell equations, linear algebra with NumPy, inverse kinematics
- **Sensors** — IMU sensor fusion with Madgwick, LiDAR point clouds, PWM servo timing
- **DevOps and tooling** — Docker Compose, Kubernetes deployments, Azure DevOps pipelines, Git interactive rebase, Bash log analysis

---

## Browser support

Works in all modern browsers. The spotlight and electrocution effects require a pointer device so they degrade gracefully on touch screens.

---

## License

Copyright (c) 2025 Fadi Helal. All Rights Reserved.

This is proprietary work. The source code, design, layout, and all content in this repository are my intellectual property. You may view it but you may not copy, reuse, redistribute, or derive anything from it without explicit written permission from me.

See the [LICENSE](./LICENSE) file for the full terms.

For collaborations or licensing inquiries: [Fadi.helal@pm.me](mailto:Fadi.helal@pm.me)
