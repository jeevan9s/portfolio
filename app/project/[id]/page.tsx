import { notFound } from "next/navigation";
import HardwarePage from "@/app/components/work/hwPage";
import FirmwarePage from "@/app/components/work/fwPage";
import { ADS131M04Flowchart, LSM6DSMFlowchart, PenguinFlowchart, TMAG5273Flowchart } from "@/app/components/work/firmwareFlowcharts";

const projects = {
  "proj-1": {
    type: "systems" as const,
    title: "Penguin",
    description:
      "Hybrid wheel-legged rover for intelligent robotics, computer vision, and embodied AI.",
    details:
      "I built Penguin because I wanted to create an intelligent robot from the ground up, exploring robotics, vision, autonomy, and embedded AI along the way.\n\nPenguin uses C++ firmware organized across hardware drivers, control, behaviour, and networking layers, with a scheduler coordinating sensor updates and control loops in real time. Locomotion is built around encoder-feedback N20 motors and PWM-driven hip servos, with PID controllers handling balance and velocity while a state machine manages behaviours and transitions between motion modes. An OV2640 camera, LSM6DSL IMU, and three VL53L0X ToF sensors provide visual, inertial, and range feedback, with robot state and telemetry consolidated for real-time monitoring through a Next.js dashboard over HTTP/WebSockets. The mechanical system was designed from the ground up, including a compact chassis and tri-bar leg assembly iterated through CAD for hybrid wheel-legged locomotion.\n\nA computer vision pipeline is being tuned around the OV2640 for visual perception and improved autonomous navigation.",
    category: "Robotics",
    mcu: "ESP32-S3-WROOM-1U",
    power: "3V3, 5V, 7.4V",
    layers: 4,
    size: "62 × 90mm",
    peripherals: "LSM6DSM IMU, OV2640 camera, DRV8833 driver, servos, ToFs.",
    repository: "https://github.com/jeevan9s/penguin-bot",
    kicaddownload: "/projs/downloads/kicad/penguin_kicad.zip",
    modelsdownload: "/projs/models/penguin_models.zip",
    models: [
      {
        path: "/projs/models/penguin_controller-optimized.glb",
        label: "Controller",
        cameraPosition: [0, 0.25, -5] as [number, number, number],
        cameraTarget: [0, 0, 0] as [number, number, number],
      },
      {
        path: "/projs/models/penguin_body.glb",
        label: "Chassis",
        cameraPosition: [0, -5, 0.25] as [number, number, number],
        cameraTarget: [0, 0, 0] as [number, number, number],
      },
    ],
    images: [
      { path: "/projs/imgs/penguin_pcb.png", label: "Controller PCB" },
      { path: "/projs/imgs/penguin_pcb_real.jpg", label: "Board" },
    ],
    media: [{ label: "firmware architecture", content: <PenguinFlowchart /> }],
  },
  "proj-2": {
    type: "hardware" as const,
    title: "Avionics Sensor & Control Modules",
    description:
      "Custom avionics hardware for propulsion control, sensing, and communications.",
    details:
      "The upper and lower control modules, Pegasus and Hydra, were designed for QRET Avionics to control and monitor the rocket's propulsion system, with two custom avionics boards designed around the different requirements of the upper and lower valve bays.\n\n Together, they handle solenoid actuation, pressure and temperature sensing, peripheral power switching, and CAN communication across the propulsion stack. Both are powered through the stack's backplane via a PCIe x1 edge connector and use 4-layer PCBs with dedicated ground planes and protected power domains. Hydra runs an STM32F1, while Pegasus runs an ESP32-S3 with Wi-Fi for launch-control communications. Power to the pressure transducers can also be switched independently to reduce consumption during low-power states.\n\n The two boards share a lot of the same circuitry, so we used KiCad's schematic sharing to keep things consistent without letting the designs drift apart. Pegasus acts as the CAN leader and forwards system data to launch control, while Hydra runs as a follower over a six-wire connection carrying power and CAN.\n\n Designed alongside Tristan Alderson (https://github.com/tristanalderson, https://www.linkedin.com/in/tristanalderson/ ), who I worked closely with throughout the development and bring-up of both board.",
    category: "Avionics",
    mcu: "STM32F1, ESP32-S3-WROOM",
    power: "3V3, 5V, 24V",
    layers: 4,
    size: "70 × 62mm",
    peripherals:
      "Solenoids, Pressure Transducers, Thermocouples, Hall-Effect Sensors,",
    repository: "https://github.com/Queens-Rocket-Engineering-Team/av-prop",
    models: [
      {
        path: "/projs/models/lower_board-optimized.glb",
        label: "Lower Valve Bay Control Module",
        cameraPosition: [0, 0.25, -5] as [number, number, number],
        cameraTarget: [0, 0, 0] as [number, number, number],
      },
      {
        path: "/projs/models/upper_board-optimized.glb",
        label: "Upper Valve Bay Control Module",
        cameraPosition: [0, 0.25, -5] as [number, number, number],
        cameraTarget: [0, 0, 0] as [number, number, number],
      },
    ],
    images: [
      { path: "/projs/imgs/hydra_pcb.png", label: "Lower Module PCB" },
      { path: "/projs/imgs/pegasus_pcb.png", label: "Upper Module PCB" },
      { path: "/projs/imgs/modules_pcb_real.jpg", label: "Module Boards" },
    ],
  },

  "proj-3": {
    type: "hardware" as const,
    title: "Homectrl",
    description:
      "Home automation controller for streamlining routine household tasks.",
    details:
      "I built Homectrl because I wanted to automate my first apartment, turning routine tasks like plant irrigation and window-blind control into something I could manage automatically.\n \n Homectrl is centered around an ESP32-S3 and a custom 4-layer controller PCB with integrated power management, low-side pump switching, soil-moisture and ambient-light sensing, reservoir-level monitoring, and stepper-motor control. A TMC2209 drives a NEMA 17 motor for the blinds, while the firmware communicates with peripherals over ADC, I²C, GPIO, and UART. Wi-Fi provides connectivity to a Next.js dashboard for remote control, telemetry, and system monitoring. The system also integrates Alexa voice control through SinricPro and MQTT, tying physical automation into a single software interface.\n\n I'm in the process of tuning the gearbox for blind-control so additional models will be added soon.",
    category: "embedded systems",
    mcu: "ESP32-S3-WROOM",
    power: "3V3, 5V, 12V",
    layers: 4,
    size: "Ø60mm",
    peripherals:
      "TMC2209 driver, pumps, float switches, moisture/light sensors.",
    repository: "https://github.com/jeevan9s/penguin-bot",
    kicaddownload: "/projs/downloads/kicad/homectrl_kicad.zip",
    models: [
      {
        path: "/projs/models/homectrl_controller-optimized.glb",
        label: "Controller",
        cameraPosition: [0, 0.25, -5] as [number, number, number],
        cameraTarget: [0, 0, 0] as [number, number, number],
      },
    ],
    images: [
      { path: "/projs/imgs/homectrl_pcb.png", label: "Controller PCB" },
      { path: "/projs/imgs/homectrl_pcb_real.jpg", label: "Board" },
    ],
  },
  "proj-4": {
    type: "firmware" as const,
    title: "Avionics Libraries",
    description:
      "I built these libraries to make the sensor and control hardware on QRET's avionics systems easier to interface with and reuse.\n\nThe libraries provide C++ drivers for the TMAG5273 3-axis Hall-effect sensor and ADS131M04 24-bit ADC, handling I2C and SPI communication, data conversion, averaging, synchronization, and device status checks. They were used across the Hydra and Pegasus sensor and control modules to interface with magnetic sensing and precision analog acquisition hardware.",
    language: "C++",
    framework: "Arduino",
    protocol: "I2C, SPI",
    repository:
      "https://github.com/Queens-Rocket-Engineering-Team/av-prop/tree/main/Firmware/libraries",
    footprint: "56 loc",
    build: "PlatformIO",
    version: "QRET Avionics 25/26",
    code: `TMAG5273 sensor;
ADS131M04 adc(CS_PIN, DRDY_PIN, &SPI);

sensor.init(0x35, Wire);
adc.init();

float flux[3];
int32_t readings[4];
float volts[4];

sensor.getAllFlux(flux);
adc.readChannels(readings);
adc.computeVoltages(readings, volts);`,
    consoleOutput: `X: 12.43 mT | Y: -4.21 mT | Z: 8.76 mT
Temp: 24.38 C

CH0: 8388607 raw | 1.234567 V
CH1: 4194304 raw | 0.617284 V
CH2: -2097152 raw | -0.308642 V
CH3: 1048576 raw | 0.154321 V`,
    media: [
      { label: "TMAG5273 init flow", content: <TMAG5273Flowchart /> },
      { label: "ADS131M04 read flow", content: <ADS131M04Flowchart /> },
    ],
    specs: [
      { label: "ADC", value: "ADS131M04 · 24-bit · 4-channel" },
      { label: "Hall Sensor", value: "TMAG5273 · 3-axis · ±80 mT" },
      { label: "Platforms", value: "ESP32, STM32" },
      { label: "Interfaces", value: "SPI, I2C" },
      { label: "Language", value: "C++" },
      { label: "Framework", value: "Arduino" },
      { label: "Protocol", value: "I2C, SPI" },
      { label: "Footprint", value: "56 loc" },
      { label: "Build", value: "PlatformIO" },
      { label: "Version", value: "QRET Avionics 25/26" },
    ],
  },
  "proj-5": {
    type: "firmware" as const,
    title: "Motion Library",
    description:
      "I built this library to give Penguin a simple, reusable interface for its IMU data without coupling the rest of the firmware to the LSM6DSM's register-level implementation.\n\nThe library provides a C++ driver for the LSM6DSM, handling I2C communication, device initialization, data-ready synchronization, raw-to-engineering-unit conversion, temperature readings, and optional gyroscope bias calibration. It provides accelerometer and gyroscope data for Penguin's motion and control systems.",
    language: "C++",
    framework: "Arduino",
    protocol: "I2C",
    repository: "https://github.com/jeevan9s/device-libs/tree/main/LSM6DSM",
    footprint: "120 loc",
    build: "PlatformIO",
    version: "2026",
    code: `LSM6DSM imu;

if (imu.init(0x6A, Wire)) {
    if (imu.dataReady()) {
        imu.readAll();

        float ax = imu.accX();
        float ay = imu.accY();
        float az = imu.accZ();

        float gx = imu.gyX();
        float gy = imu.gyY();
        float gz = imu.gyZ();
    }
}`,
    consoleOutput: `LSM6DSM online
acc X: 0.02 | acc Y: -0.01 | acc Z: 0.98 G
gyr X: 0.14 | gyr Y: -0.08 | gyr Z: 0.21 dps
Temp: 24.63 C`,
  media: [{ label: "LSM6DSM read loop", content: <LSM6DSMFlowchart /> }],
    specs: [
      { label: "Sensor", value: "LSM6DSM · 6-axis IMU" },
      { label: "Accelerometer", value: "3-axis · G" },
      { label: "Gyroscope", value: "3-axis · dps" },
      { label: "Platform", value: "ESP32" },
      { label: "Language", value: "C++" },
      { label: "Framework", value: "Arduino" },
      { label: "Protocol", value: "I2C" },
      { label: "Footprint", value: "120 loc" },
      { label: "Build", value: "PlatformIO" },
      { label: "Version", value: "2026" },
    ],
  },
  "proj-6": {
    type: "firmware" as const,
    title: "Calmeca",
    description:
      "I built Calmeca because I wanted a tool to make course organization and scheduling less tedious, especially during syllabus week.\n\nIt turns course syllabi into structured academic data, extracting exams, assignments, recurring tasks, and other key dates before syncing them with Google Calendar. The app combines a React frontend with a NeutralinoJS desktop runtime, IndexedDB for local course and task data, Google OAuth and Calendar integrations, and an OpenAI-powered extraction pipeline.",
    language: "TypeScript",
    framework: "React, NeutralinoJS",
    apis: "Google Calendar, OpenAI",
    footprint: "Desktop",
    build: "Vite",
    version: "2026",
    code: `// an abstract snippet of the extraction service
    
    const extraction = await extractionService.extract(
    await PDFService.extractText(syllabus),
);

await addGoogleCalendarEvent({
    summary: extraction.exam.title,
    start: extraction.exam.start,
    end: extraction.exam.end,
});`,
    consoleOutput: `extracting syllabus...
course data extracted
4 assignments found
2 exams found
3 recurring tasks found
syncing with Google Calendar...
calendar sync complete`,
    specs: [
      { label: "Runtime", value: "NeutralinoJS" },
      { label: "Database", value: "IndexedDB · Dexie" },
      { label: "Integrations", value: "Google Calendar · OpenAI" },
    ],
    repository: "https://github.com/jeevan9s/calmeca-app",
  },
};

type ProjectId = keyof typeof projects;

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = projects[id as ProjectId];
  if (!project) notFound();

  return project.type === "firmware" ? (
    <FirmwarePage project={project} />
  ) : (
    <HardwarePage project={project} />
  );
}
