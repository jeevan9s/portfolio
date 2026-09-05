type FlowStep = { title: string; subtitle?: string };

function FlowColumn({ label, steps, x, boxWidth = 260 }: { label: string; steps: FlowStep[]; x: number; boxWidth?: number }) {
  const boxHeight = 50;
  const gap = 40;
  return (
    <>
      <text x={x + boxWidth / 2} y="24" textAnchor="middle" fontSize="12" letterSpacing="1.5" fill="#878787">{label.toUpperCase()}</text>
      {steps.map((step, index) => {
        const y = 40 + index * (boxHeight + gap);
        return (
          <g key={step.title}>
            <rect x={x} y={y} width={boxWidth} height={boxHeight} rx="6" fill="#F5F5F5" stroke="#D9D9D9" strokeWidth="0.75" />
            <text x={x + boxWidth / 2} y={step.subtitle ? y + 20 : y + 30} textAnchor="middle" fontSize="13" fill="#1E1E1E">{step.title}</text>
            {step.subtitle && <text x={x + boxWidth / 2} y={y + 36} textAnchor="middle" fontSize="11" fill="#878787">{step.subtitle}</text>}
            {index < steps.length - 1 && <line x1={x + boxWidth / 2} y1={y + boxHeight} x2={x + boxWidth / 2} y2={y + boxHeight + gap} stroke="#878787" strokeWidth="1" markerEnd="url(#firmware-flow-arrow)" />}
          </g>
        );
      })}
    </>
  );
}

export function FirmwareFlowchart({ initSteps, readSteps }: { initSteps: FlowStep[]; readSteps: FlowStep[] }) {
  const rows = Math.max(initSteps.length, readSteps.length);
  const height = 40 + rows * 90 + 20;
  return (
    <div className="inter flex min-h-[20rem] items-center justify-center bg-card p-8 sm:min-h-[25rem]">
      <svg viewBox={`0 0 700 ${height}`} className="h-full w-full max-w-2xl" role="img" aria-label="Init and read flow">
        <defs>
          <marker id="firmware-flow-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M2 1L8 5L2 9" fill="none" stroke="#878787" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </marker>
        </defs>
        <FlowColumn label="Init" steps={initSteps} x={40} />
        <FlowColumn label="Read" steps={readSteps} x={400} />
      </svg>
    </div>
  );
}

export function LSM6DSMFlowchart() {
  return <FirmwareFlowchart initSteps={[{ title: "Serial + I2C init" }, { title: "imu.init(0x6A, Wire)" }, { title: "Configure accel + gyro" }, { title: "Return true / false" }]} readSteps={[{ title: "dataReady()" }, { title: "readAll()", subtitle: "cache raw registers" }, { title: "Convert to G / dps" }, { title: "accX/Y/Z, gyX/Y/Z" }]} />;
}

export function TMAG5273Flowchart() {
  return <FirmwareFlowchart initSteps={[{ title: "I2C init (addr 0x35)" }, { title: "Verify manufacturer ID" }, { title: "Configure sensor + averaging" }, { title: "Check status, return bool" }]} readSteps={[{ title: "getAllFlux(axes)", subtitle: "burst read X/Y/Z" }, { title: "Combine MSB + LSB" }, { title: "rawTomT()", subtitle: "convert to mT" }, { title: "getTemp()" }]} />;
}

export function ADS131M04Flowchart() {
  return <FirmwareFlowchart initSteps={[{ title: "SPI.begin() + adc.init()" }, { title: "Configure CS + DRDY pins" }, { title: "SPI peripheral ready" }, { title: "Ready for sampling" }]} readSteps={[{ title: "Poll DRDY", subtitle: "2ms timeout" }, { title: "captureFrame()", subtitle: "6-word SPI frame" }, { title: "extendSign()", subtitle: "decode 2's complement" }, { title: "computeVoltages()" }]} />;
}

export function PenguinFlowchart() {
  return (
    <div className="inter flex min-h-[20rem] items-center justify-center bg-card p-8 sm:min-h-[25rem]">
      <svg viewBox="0 0 800 640" className="h-full w-full max-w-3xl" role="img" aria-label="Penguin robot and dashboard system flow">
        <defs><marker id="penguin-flow-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M2 1L8 5L2 9" fill="none" stroke="#878787" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></marker></defs>
        <rect x="140" y="40" width="560" height="380" rx="40" fill="none" stroke="#D9D9D9" strokeWidth="1.5" />
        <rect x="150" y="460" width="290" height="140" rx="30" fill="none" stroke="#D9D9D9" strokeWidth="1.5" />
        <rect x="20" y="200" width="95" height="38" rx="6" fill="#F5F5F5" stroke="#D9D9D9" /><text x="67" y="224" textAnchor="middle" fontSize="16" fontWeight="500" fill="#1E1E1E">robot</text>
        <rect x="15" y="515" width="105" height="38" rx="6" fill="#F5F5F5" stroke="#D9D9D9" /><text x="67" y="539" textAnchor="middle" fontSize="16" fontWeight="500" fill="#1E1E1E">dashboard</text>
        <path d="M420 103 V118 M420 118 H315 M420 118 H550 M315 170 V185 M550 168 V175 M550 223 V235 M550 275 V285 M550 315 V325 M315 350 V410 H210 V460 M315 410 H325 V460 M210 515 V528 H270 V545 M325 515 V528 H270" fill="none" stroke="#878787" strokeWidth="1" markerEnd="url(#penguin-flow-arrow)" />
        <rect x="340" y="65" width="160" height="38" rx="6" fill="#F5F5F5" stroke="#D9D9D9" /><text x="420" y="89" textAnchor="middle" fontSize="13" fill="#1E1E1E">Scheduler</text>
        <rect x="235" y="130" width="160" height="40" rx="6" fill="#F5F5F5" stroke="#D9D9D9" /><text x="315" y="146" textAnchor="middle" fontSize="13" fill="#1E1E1E">Sensor</text><text x="315" y="162" textAnchor="middle" fontSize="13" fill="#1E1E1E">Drivers</text>
        <rect x="470" y="130" width="160" height="38" rx="6" fill="#F5F5F5" stroke="#D9D9D9" /><text x="550" y="154" textAnchor="middle" fontSize="13" fill="#1E1E1E">Behaviour</text>
        <rect x="150" y="185" width="70" height="45" rx="6" fill="#F5F5F5" stroke="#D9D9D9" /><text x="185" y="203" textAnchor="middle" fontSize="12" fill="#1E1E1E">Camera</text><text x="185" y="218" textAnchor="middle" fontSize="12" fill="#1E1E1E">Stream</text>
        <rect x="235" y="185" width="160" height="40" rx="6" fill="#F5F5F5" stroke="#D9D9D9" /><text x="315" y="201" textAnchor="middle" fontSize="13" fill="#1E1E1E">Penguin</text><text x="315" y="217" textAnchor="middle" fontSize="13" fill="#1E1E1E">State</text>
        <rect x="470" y="175" width="160" height="48" rx="6" fill="#F5F5F5" stroke="#D9D9D9" /><text x="550" y="192" textAnchor="middle" fontSize="12" fill="#1E1E1E">Routines</text><text x="550" y="215" textAnchor="middle" fontSize="12" fill="#1E1E1E">Motion Primitives</text>
        <rect x="235" y="255" width="160" height="95" rx="6" fill="#F5F5F5" stroke="#D9D9D9" /><text x="315" y="307" textAnchor="middle" fontSize="13" fill="#1E1E1E">Networking</text>
        <rect x="470" y="235" width="160" height="40" rx="6" fill="#F5F5F5" stroke="#D9D9D9" /><text x="550" y="251" textAnchor="middle" fontSize="13" fill="#1E1E1E">Penguin</text><text x="550" y="267" textAnchor="middle" fontSize="13" fill="#1E1E1E">Commands</text>
        <rect x="470" y="285" width="160" height="30" rx="6" fill="#F5F5F5" stroke="#D9D9D9" /><text x="550" y="304" textAnchor="middle" fontSize="12" fill="#1E1E1E">Locomotion Controller</text>
        <rect x="470" y="325" width="160" height="35" rx="6" fill="#F5F5F5" stroke="#D9D9D9" /><text x="550" y="341" textAnchor="middle" fontSize="12" fill="#1E1E1E">Motor</text><text x="550" y="356" textAnchor="middle" fontSize="12" fill="#1E1E1E">Drivers</text>
        <rect x="165" y="480" width="90" height="35" rx="6" fill="#F5F5F5" stroke="#D9D9D9" /><text x="210" y="495" textAnchor="middle" fontSize="11" fill="#1E1E1E">Websocket</text><text x="210" y="509" textAnchor="middle" fontSize="11" fill="#1E1E1E">Listener</text>
        <rect x="270" y="480" width="110" height="35" rx="6" fill="#F5F5F5" stroke="#D9D9D9" /><text x="325" y="495" textAnchor="middle" fontSize="11" fill="#1E1E1E">HTTP Camera</text><text x="325" y="509" textAnchor="middle" fontSize="11" fill="#1E1E1E">Stream</text>
        <rect x="215" y="545" width="110" height="35" rx="6" fill="#F5F5F5" stroke="#D9D9D9" /><text x="270" y="560" textAnchor="middle" fontSize="11" fill="#1E1E1E">Dashboard</text><text x="270" y="574" textAnchor="middle" fontSize="11" fill="#1E1E1E">Visuals</text>
      </svg>
    </div>
  );
}
