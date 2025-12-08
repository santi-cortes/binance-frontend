# 📌 Proyecto: Crypto Dashboard — React + TypeScript + Tailwind + Lightweight Charts

Este proyecto es una **prueba técnica** que consiste en un panel simple para visualizar información de criptomonedas, incluyendo:

- Listado de criptos
- Detalle individual
- Gráfica de velas (Lightweight Charts)
- Formularios con validación en tiempo real
- Navegación con React Router
- API mock o real para obtener datos

---

## 🚀 Tecnologías utilizadas

- React 18
- TypeScript
- React Router v6
- TailwindCSS
- Lightweight Charts
- Fetch API
- Vite

---

## 📂 Estructura del proyecto

```
src/
 ├─ api/
 │   └─ cryptoApi.ts
 ├─ components/
 │   ├─ Header.tsx
 │   ├─ Formulario.tsx
 ├─ pages/
 │   ├─ CryptoList.tsx
 │   └─ CryptoDetail.tsx
 ├─ types/
 │   └─ index.ts
 ├─ App.tsx
 ├─ main.tsx
 └─ styles.css
```

---

## 🧩 Funcionalidades principales

### 1. Listado de criptomonedas

- Tabla con datos principales.
- Navegación al detalle.

### 2. Vista de detalle

Incluye:

- Información completa del kline.
- Gráfica de velas (Lightweight Charts).
- Botón para volver al listado.
- Diseño con TailwindCSS.

### 3. Formulario con validación

- Validación en `onBlur`.
- Botón deshabilitado si hay errores.
- Reset con un clic.
- Tipado estricto.

### 4. API

- Obtiene datos desde backend o mock.
- Manejo de errores y loading.

---

## ⚙️ Instalación

```bash
npm install
```

---

## ▶️ Ejecución del proyecto

```bash
npm run dev
```

---

## 🧪 Scripts disponibles

| Comando         | Descripción         |
| --------------- | ------------------- |
| npm run dev     | Desarrollo local    |
| npm run build   | Build de producción |
| npm run preview | Previsualizar build |

---

## 📈 Gráfica (Lightweight Charts)

La gráfica utiliza:

- Serie de velas
- Auto ajuste del viewport
- Colores personalizados
- Transformación desde CryptoData

---

## 📘 Tipos utilizados

```ts
export interface CryptoData {
  id: number;
  openTime: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  closeTime: number;
  quoteAssetVolume: number;
  numTrades: number;
  takerBuyBaseVolume: number;
  takerBuyQuoteVolume: number;
  ignore: number;
}
```

---

## 🎨 Diseño

- Minimalista
- Espaciado amplio
- Sombras suaves
- Bordes redondeados XXL
- Backdrop blur
- Paleta moderna

---

## 🏁 Conclusión

Este proyecto demuestra:

- Dominio de React + TypeScript
- Buen manejo de estado y validación
- Integración de librerías externas
- Arquitectura clara
- Estilo moderno con Tailwind
