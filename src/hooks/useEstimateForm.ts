import { useState, useMemo } from "react";
import type { ServiceId, PropertySize } from "@/types/estimate";
import {
  ESTIMATE_SERVICES,
  ESTIMATE_PROPERTY_SIZES,
} from "@/constants/estimate";
import { CONTACT } from "@/constants/contact";

export function useEstimateForm() {
  const [selectedService, setSelectedServide] = useState<ServiceId | null>(
    null,
  );
  const [selectedSize, setSelectedSize] = useState<PropertySize | null>(null);
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

  const isReadyToSubmit = selectedService !== null && selectedSize !== null;

  const whatsappUrl = useMemo(() => {
    if (!isReadyToSubmit) return null;

    const message = [
      "Hi, I'd like to request a free estimate.",
      "",
      `Service: ${selectedServiceName}`,
      `Property Size: ${selectedSizeName}`,
      measurements ? `Measurements: ${measurements}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    return `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`;
  }, [isReadyToSubmit, selectedServiceName, selectedSizeName, measurements]);

  const reset = () => {
    setSelectedServide(null);
    setSelectedSize(null);
    setMeasurements("");
  };

  return {
    selectedService,
    setSelectedServide,
    selectedSize,
    setSelectedSize,
    measurements,
    setMeasurements,
    selectedServiceName,
    selectedSizeName,
    isReadyToSubmit,
    whatsappUrl,
    reset,
  };
}
