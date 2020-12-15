import { useState } from "react";
import Tab from "ui/common/Tab";
import * as formats from "resources/formats";
import TilemapInstance from "tilemap";
import FormatSelector from "ui/sidebar/export/FormatSelector";
import Button from "ui/common/Button";

const ExportSettings = () => {
  // ====================================
  // Initialize
  // ====================================
  const [format, setFormat] = useState(formats.FORMAT_JSON);

  // ====================================
  // Logic
  // ====================================
  const onOptionSelected = (e) => {
    setFormat(e.target.value);
  };

  const handleExport = async () => {
    const rawData = await TilemapInstance.export(format);
    const filename = "tilemap." + format;
    const blob = new Blob([rawData], { type: "application/json" });
    const a = document.createElement("a");

    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
  };

  // ====================================
  // Render
  // ====================================
  return (
    <Tab title="Export Map">
      <FormatSelector format={format} onOptionSelected={onOptionSelected} />
      <Button text="Export" onClick={handleExport} />
    </Tab>
  );
};

export default ExportSettings;
