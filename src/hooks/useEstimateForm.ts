// src/hooks/useEstimateForm.ts
import { useState, useMemo } from "react";
import type { ServiceId, PropertySize, ServiceArea } from "@/types/estimate";
import {
  ESTIMATE_SERVICES,
  ESTIMATE_PROPERTY_SIZES,
  ESTIMATE_AREAS,
} from "@/constants/estimate";
import { CONTACT } from "@/constants/contact";

// Arriba del hook, fuera de la función
const EMOJI = {
  leaf: String.fromCodePoint(0x1f33f), // 🌿
  tools: String.fromCodePoint(0x1f6e0, 0xfe0f), // 🛠️
  ruler: String.fromCodePoint(0x1f4cf), // 📏
  pin: String.fromCodePoint(0x1f4cd), // 📍
  triangle: String.fromCodePoint(0x1f4d0), // 📐
  pray: String.fromCodePoint(0x1f64f), // 🙏
};

export function useEstimateForm() {
  const [selectedService, setSelectedService] = useState<ServiceId | null>(
    null,
  );
  const [selectedSize, setSelectedSize] = useState<PropertySize | null>(null);
  const [selectedArea, setSelectedArea] = useState<ServiceArea | null>(null);
  const [measurements, setMeasurements] = useState("");

  const selectedServiceName = useMemo(
    () => ESTIMATE_SERVICES.find((s) => s.id === selectedService)?.name ?? null,
    [selectedService],
  );

  const selectedSizeName = useMemo(
    () =>
      ESTIMATE_PROPERTY_SIZES.find((s) => s.id === selectedSize)?.name ?? null,
    [selectedSize],
  );

  const selectedAreaName = useMemo(
    () => ESTIMATE_AREAS.find((a) => a.id === selectedArea)?.name ?? null,
    [selectedArea],
  );

  // Ahora también requiere la localidad para poder enviar
  const isReadyToSubmit =
    selectedService !== null && selectedSize !== null && selectedArea !== null;

  const whatsappUrl = useMemo(() => {
    if (!isReadyToSubmit) return null;

    const message = [
      `${EMOJI.leaf} *New Estimate Request* ${EMOJI.leaf}`,
      "",
      "Hi! I'd like to request a free estimate for the following:",
      "",
      `${EMOJI.tools} *Service:* ${selectedServiceName}`,
      `${EMOJI.ruler} *Property Size:* ${selectedSizeName}`,
      `${EMOJI.pin} *Area:* ${selectedAreaName}`,
      measurements ? `${EMOJI.triangle} *Measurements:* ${measurements}` : null,
      "",
      `Thank you! Looking forward to your response. ${EMOJI.pray}`,
    ]
      .filter(Boolean)
      .join("\n");
    console.log("MENSAJE:", message);
    console.log(
      "URL:",
      `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`,
    );
    return `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`;
  }, [
    isReadyToSubmit,
    selectedServiceName,
    selectedSizeName,
    selectedAreaName,
    measurements,
  ]);

  const reset = () => {
    setSelectedService(null);
    setSelectedSize(null);
    setSelectedArea(null);
    setMeasurements("");
  };

  return {
    selectedService,
    selectedSize,
    selectedArea,
    measurements,
    selectedServiceName,
    selectedSizeName,
    selectedAreaName,
    setSelectedService,
    setSelectedSize,
    setSelectedArea,
    setMeasurements,
    isReadyToSubmit,
    whatsappUrl,
    reset,
  };
}
