const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const heicConvert = require("heic-convert");

// Pon aquí la ruta de la carpeta en la que estés trabajando
const directoryPath = path.join(
  __dirname,
  "public/portfolio/Vegetable Garden Fence, Weed Barrier & Gravel Installation – Lucketts, VA",
);

(async () => {
  try {
    const files = fs.readdirSync(directoryPath);

    for (const file of files) {
      const ext = path.extname(file).toLowerCase();

      // Ignoramos los archivos que ya son webp, los videos y archivos del sistema
      if (
        ext === ".webp" ||
        ext === ".mov" ||
        ext === ".mp4" ||
        file.startsWith(".")
      )
        continue;

      const filePath = path.join(directoryPath, file);
      const fileNameWithoutExt = path.basename(file, path.extname(file));
      const outputPath = path.join(directoryPath, `${fileNameWithoutExt}.webp`);

      console.log(`⏳ Procesando: ${file}...`);

      try {
        if (ext === ".heic") {
          // Decodificación del HEIC de Apple
          const inputBuffer = fs.readFileSync(filePath);
          const jpegBuffer = await heicConvert({
            buffer: inputBuffer,
            format: "JPEG",
            quality: 1,
          });

          // Compresión a WebP
          await sharp(jpegBuffer).webp({ quality: 80 }).toFile(outputPath);
          console.log(
            `✅ Convertido (HEIC): ${file} -> ${fileNameWithoutExt}.webp`,
          );
        } else {
          // Procesamiento directo para JPG o PNG
          await sharp(filePath).webp({ quality: 80 }).toFile(outputPath);
          console.log(`✅ Convertido: ${file} -> ${fileNameWithoutExt}.webp`);
        }

        // 🔥 ¡AQUÍ SE BORRA EL ARCHIVO ORIGINAL SÓLO SI LA CONVERSIÓN FUE EXITOSA!
        fs.unlinkSync(filePath);
        console.log(`🗑️ Archivo original eliminado de forma segura: ${file}`);
      } catch (err) {
        console.error(
          `❌ Falló al procesar ${file} (No se eliminó el original):`,
          err.message,
        );
      }
    }

    console.log("🎉 ¡Proceso de conversión y limpieza completado con éxito!");
  } catch (err) {
    console.error("No se pudo escanear el directorio:", err);
  }
})();
