let printType = 'bw'; // Valor inicial como blanco y negro

function selectPrintType(type) {
  printType = type;
  const bwBtn = document.getElementById('bw');
  const colorBtn = document.getElementById('color');

  if (printType === 'bw') {
    bwBtn.style.backgroundColor = '#FF66B2';
    bwBtn.style.color = 'white';
    colorBtn.style.backgroundColor = '#FFB3D9';
    colorBtn.style.color = '#FF66B2';
  } else {
    colorBtn.style.backgroundColor = '#FF66B2';
    colorBtn.style.color = 'white';
    bwBtn.style.backgroundColor = '#FFB3D9';
    bwBtn.style.color = '#FF66B2';
  }
}

function calculatePrice() {
  const pages = parseInt(document.getElementById('pages').value);
  if (isNaN(pages) || pages <= 0) {
    document.getElementById('result').textContent = "Por favor ingrese un número válido de páginas.";
    return;
  }

  // Si el número de planas supera 540 (anilla más grande disponible)
  if (pages > 540) {
    document.getElementById('result').textContent = "Aún no tenemos un tamaño de espiral para libros de más de 540 páginas :c.";
    return;
  }

  // Cálculo de hojas completas (planas)
  const sheets = Math.ceil(pages / 2); // Una página plana es una hoja, entonces dividimos por 2

  // Costos variables
  const paperCostPerSheet = 12; // Costo por hoja en CLP
  const inkCostPerPageBW = 15; // Costo por página en blanco y negro
  const inkCostPerPageColor = 37.5; // Costo por página en color
  const micaCost = 150; // Costo por mica
  const boxCost = 500; // Costo de caja de envío
  const protectionMaterialCost = 200; // Costo de material de protección
  const tapeCost = 50; // Costo de cinta de embalaje
  
  // Cálculo de anillas (con las planas)
  const ringCost = calculateRingCost(sheets);

  // Cálculos de costo
  const paperCost = sheets * paperCostPerSheet;
  const inkCost = printType === 'color' ? pages * inkCostPerPageColor : pages * inkCostPerPageBW;
  const micaTotal = 2 * micaCost; // Micas, ya que siempre usamos dos
  const packagingCost = boxCost + protectionMaterialCost + tapeCost; // Costo de embalaje
  const totalCost = paperCost + inkCost + micaTotal + ringCost + packagingCost;

  // Aplicar margen de ganancia del 50%
  const salePrice = totalCost * 1.5;
  
  // Aplicar IVA (19%)
  const priceWithIVA = salePrice * 1.19;
  
  // Redondear al múltiplo de 100 más cercano hacia arriba
  const roundedPrice = Math.ceil(priceWithIVA / 100) * 100;

  // Mostrar el precio final
  document.getElementById('result').textContent = `El precio IVA incluido es de $${roundedPrice} CLP.`;
}

function calculateRingCost(sheets) {
  let ringCost = 0;
  
  // Seleccionar el costo de anillas según las hojas completas (no páginas)
  if (sheets <= 25) {
    ringCost = 3960 / 100; // 8mm, hasta 25 hojas
  } else if (sheets <= 50) {
    ringCost = 4300 / 100; // 10mm, hasta 50 hojas
  } else if (sheets <= 80) {
    ringCost = 4000 / 50; // 14mm, hasta 80 hojas
  } else if (sheets <= 110) {
    ringCost = 5100 / 50; // 18mm, hasta 110 hojas
  } else if (sheets <= 120) {
    ringCost = 5600 / 50; // 20mm, hasta 120 hojas
  } else if (sheets <= 160) {
    ringCost = 4600 / 25; // 26mm, hasta 160 hojas
  } else if (sheets <= 270) {
    ringCost = 5700 / 25; // 32mm, hasta 270 hojas
  }

  return ringCost;
}

