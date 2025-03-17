// Obtener el modal y la imagen
let modal = document.getElementById('imageModal');
let modalImage = document.getElementById('modalImage');

// Obtener todas las imágenes del carrusel
let images = document.querySelectorAll('.carousel-item img');

// Agregar un evento de clic a cada imagen
for (let i = 0; i < images.length; i++) {
  images[i].addEventListener('click', function(event) {
    let imageSrc = event.target.src; // Obtener la fuente de la imagen
    modalImage.src = imageSrc; // Asignar la fuente al modal
    modal.style.display = 'block'; // Mostrar el modal
  });
}

// Agregar un evento para cerrar el modal cuando se haga clic en el botón de cierre
let closeModal = document.querySelector('.btn-close');
closeModal.addEventListener('click', function() {
  modal.style.display = 'none'; // Ocultar el modal
});

// Cerrar el modal si se hace clic fuera de la imagen
window.addEventListener('click', function(event) {
  if (event.target === modal) {
    modal.style.display = 'none'; // Ocultar el modal
  }
});