$(document).ready(function () {
  $('.upload-btn').on('click', function (e) {
    e.preventDefault()
    $('#upload-input').click()
    $('.data-container').show()
    $('pre').hide()
    $('.img-container').empty().html('<div class="icon"><i class="fa fa-file-image-o"></i></div>')
    $('.progress .determinate').width('0%')
  })
  $('#upload-input').on('change', function (e) {
    $('.card .progress').show()
    var files = $(this).get(0).files
    if (files.length > 0) {
      console.log(files)
      var formData = new FormData()
      for (var i = 0; i < 1; i++) {
        var file = files[i]
        formData.append('uploads[]', file, file.name)
      }
      $.ajax({
        url: '/upload',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function (data) {
          $('.card .progress').hide()
          $('.progress .determinate').width('0%')
          if (data.format === 'png' || data.format === 'jpeg') {
            $('.img-container').empty().html('<img src="' + data.secure_url + '"/>')
          } else {
            $('.img-container').empty().html('<div class="icon"><i class="fa fa-check"></i></div>')
            setTimeout(function () {
              $('.img-container').empty().html('<div class="icon"><i class="fa fa-file-image-o"></i></div>')
            }, 1000)
          }
          $('.data-container').hide()
          $('pre').show().text(JSON.stringify(data, null, ' '))
        },
        xhr: function () {
          var xhr = new XMLHttpRequest()
          xhr.upload.addEventListener('progress', function (e) {
            if (e.lengthComputable) {
              var percentComplete = e.loaded / e.total
              percentComplete = parseInt(percentComplete * 100)
              $('.progress .determinate').width(percentComplete + '%')
              $('.img-container .icon ').empty().text(percentComplete + '%')
              if (percentComplete === 100) {
                $('.img-container .icon ').empty().text('Done')
                $('.data-container').html('<i class="fa fa-spin fa-spinner fa-2x"></i>')
              }
            }
          }, false)
          return xhr
        }
      })
    }
  })
})
