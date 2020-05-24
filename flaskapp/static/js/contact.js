let CONTACT_METHODS = ['telegram', 'discord', 'whatsapp'];

function addTextField(element)
{

  var additionalContactTemplate = $('#additionalContactTemplate').html();
  var additionalPlatforms = $('#additionalPlatforms');

  var additionalText = {
    method: element.innerHTML
  }

  additionalPlatforms.append(Mustache.render(additionalContactTemplate, additionalText));

}

// create a function for throwing form errors
function throwFormError(message)
{
  // get the error field
  var formErrors = $('#formErrors');
  formErrors.empty();
  new_error = '<p class="submission-error">' + message + '</p>'
  formErrors.append('<p class="submission-error">Please include an email</p>');
}

// add a submission reaction
$('#contactForm').submit(function(e) {
  e.preventDefault();

  // load in the data
  var name = $('#nameField').val();
  var phoneNumber = $('#phoneField').val();
  var email = $('#emailField').val();
  var subject = $('#subjectField').val();
  var message = $('#messageField').val();
  var sendable = true;

  // get an array of added platforms
  var addedPlatforms = $('input[label="additionalPlatform"]').map(function(i,el) {
    var username = $(el).val();
    var platform = $(el).attr('placeholder');
    var new_platform = {
      username: username,
      platform: platform
    }
    return new_platform;
    }).get();

  // check a few conditions
  if (email.length == 0)
  {
    sendable = false;
    throwFormError('Please add an email.');
  }

  if (name.length == 0)
  {
    sendable = false;
    throwFormError('Please add your name.');
  }

  if (message.length == 0)
  {
    sendable = false;
    throwFormError('Please include a message');
  }

  if (sendable)
  {
    // format this with ajax to send it
    $.ajax({
              type: 'POST',
              // THIS WILL NEED TO BE CHANGED!!!
              url: "http://entredeveloperslab.com/add_lead",
              data: JSON.stringify(
                {
                    name: name,
                    email: email,
                    phoneNumber: phoneNumber,
                    subject: subject,
                    message: message,
                    additionalPlatforms: addedPlatforms
                }),
              success: function (response) {
                // empty the errors
                $('#formErrors').empty();

                // empty the form
                $('form').find("input[type=text], textarea").val("");

                //submit a success message
                $('#submitField').append('<p>Your submission has been recorded. We will contact you soon!</p>');
              },
              error: function () {
                alert('Error is submitting form. Try again later.');
              }
        });
  }

});

