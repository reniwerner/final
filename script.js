$(document).ready(function() {
    
    function fetchAnimalData() {
      $.ajax({
        url: 'https://api.adoptapet.com/search/limited_pet_details?key=A34F48&v=2&output=json&pet_id=2342',
        method: 'GET',
        success: function(data) {
          $('#animal-container').empty(); 
          if (data.pet) {
            const animal = data.pet;
            displayAnimal(animal);
          } else {
            $('#animal-container').append('<p>No animal data found.</p>');
          }
        },
        error: function(err) {
          console.error('Error fetching data:', err);
          $('#animal-container').append('<p>Error fetching data.</p>');
        }
      });
    }
  
    function displayAnimal(animal) {
      $('#animal-container').append(`
        <div class="animal-card" data-id="${animal.id}">
          <h3>${animal.name}</h3>
          <p>Species: ${animal.species}</p>
          <p>Age: ${animal.age}</p>
          <p>Status: ${animal.status}</p>
          <button class="edit-btn">Edit</button>
          <button class="delete-btn">Delete</button>
        </div>
      `);
    }
  
    fetchAnimalData();
  
    
    $('#animal-form').submit(function(e) {
      e.preventDefault();
      const name = $('#name').val();
      const species = $('#species').val();
      const age = $('#age').val();
  
      
      const newAnimal = {
        id: Date.now(), 
        name,
        species,
        age,
        status: 'available'
      };
  
      displayAnimal(newAnimal);
      $('#name, #species, #age').val(''); 
    });
  
   
    $('#animal-container').on('click', '.delete-btn', function() {
      $(this).closest('.animal-card').remove();
    });
  
    
    $('#animal-container').on('click', '.edit-btn', function() {
      const card = $(this).closest('.animal-card');
      const name = card.find('h3').text();
      const species = card.find('p:eq(0)').text().replace('Species: ', '');
      const age = card.find('p:eq(1)').text().replace('Age: ', '');
  
      
      card.html(`
        <input type="text" class="edit-name" value="${name}" required>
        <input type="text" class="edit-species" value="${species}" required>
        <input type="number" class="edit-age" value="${age}" required>
        <button class="save-btn">Save</button>
      `);
    });

    $('#animal-container').on('click', '.save-btn', function() {
      const card = $(this).closest('.animal-card');
      const id = card.data('id');
      const name = card.find('.edit-name').val();
      const species = card.find('.edit-species').val();
      const age = card.find('.edit-age').val();
  
      card.html(`
        <h3>${name}</h3>
        <p>Species: ${species}</p>
        <p>Age: ${age}</p>
        <p>Status: available</p>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
      `);
    });
  });