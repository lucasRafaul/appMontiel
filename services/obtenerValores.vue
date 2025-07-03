<script >
export async function getValores(appId) {
  const response = await fetch(
    `https://openexchangerates.org/api/latest.json?app_id=${appId}`
  );
  if (!response.ok) {
    throw new Error("Error al los valores de monedas");
  }
  return response.json();
}


</script>

