import { notFound } from "next/navigation";
import HardwarePage from "@/app/components/work/hwPage";
import FirmwarePage from "@/app/components/work/fwPage";

const projects = {
  "proj-1": {
    type: "hardware" as const,
    title: "Penguin",
    description: "Hybrid wheel-legged rover for intelligent robotics, computer vision, and embodied AI.",
    mcu: "ESP32-S3",
    layers: 4,
    size: "62 × 90mm",
    modelPath: "/projs/models/compressed/penguin_controller.draco.glb",
  },
  "proj-2": {
    type: "hardware" as const,
    title: "Avionics Sensor & Control Modules",
    description: "Custom avionics hardware for propulsion control, sensing, and communications.",
    mcu: "STM32F1",
    layers: 4,
    size: "70 x 62mm",
    modelPath: "/projs/models/compressed/modules.draco.glb",
  },
  "proj-3": {
    type: "hardware" as const,
    title: "Homectrl",
    description: "Home automation controller for streamlining routine household tasks.",
    mcu: "ESP32-S3-1U",
    layers: 4,
    size: "Ø60mm",
    modelPath: "/projs/models/compressed/homectrl_controller.draco.glb",
  },
  "proj-4": {
    type: "firmware" as const,
    title: "Avionics Libraries",
    description: "Reusable embedded drivers and peripheral libraries for avionics systems.",
    language: "C++",
    framework: "PlatformIO",
    protocol: "SPI, I2C",
  },
  "proj-5": {
    type: "firmware" as const,
    title: "Motion Library",
    description: "Embedded IMU driver and motion utilities for the LSM6DSM measuring unit.",
    language: "C++",
    framework: "PlatformIO",
    protocol: "I2C",
  },
  "proj-6": {
    type: "firmware" as const,
    title: "Calmeca",
    description: "Academic productivity app built to streamline course scheduling and management.",
    language: "TypeScript",
    framework: "Next.js",
    apis: "Google, OAuth",
  },
};

type ProjectId = keyof typeof projects;

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = projects[id as ProjectId];
  if (!project) notFound();

  return project.type === "hardware"
    ? <HardwarePage project={project} />
    : <FirmwarePage project={project} />;
}
