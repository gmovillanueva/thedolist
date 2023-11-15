export function openModal(id) {
  const modal = document.getElementById(id);
  modal.style.display = 'block';
}

export function closeModal(id) {
  const modal = document.getElementById(id);
  modal.style.display = 'none';
}
