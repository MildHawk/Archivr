// <editable-screenshot screenshot="screenshotObj"></editable-screenshot>
function editableScreenshot() {
  var directive = {};

  directive.scope = {
    screenshot: '=screenshot',
    save: '=save'
  };

  // replace with template markup
  directive.replace = true;

  // restrict to elements and attributes
  directive.restrict = 'EA';

  // template
  directive.template = [
    '<div>',

      // drawing controls
      '<div class="controls">',
        '<ul class="list-inline">',
          '<li>',
            '<button data-save class="btn btn-default">Save</button>',
          '</li>',
        '</ul>',
      '</div>',

      '<canvas id="image" style="background:url(\'{{ screenshot.originalImage }}\') no-repeat left top;"',
      ' width="{{ screenshot.width }}" height="{{ screenshot.height }}"></canvas>',
      // drawing container
      // '<div class="image" style="',
      // 'background:url(\'{{ screenshot.originalImage }}\') no-repeat left top;',
      // ' width:{{ screenshot.width }}; height:{{ screenshot.height }};">',
      //   '<canvas id="editableScreenshot" style="position:absolute;left:0;top:0;z-index:10;"></canvas>',
      // '</div>',
    '</div>',
  ].join('');

  // link
  directive.link = function(scope, el, attrs) {
    // save jquery wrapped element
    var $el = $(el);
    console.log(scope.screenshot);
    var canvas = $el.find('#image');
    canvas.sketch();
    
    $el.find('[data-save]').on('click', function(e){
      //var data = canvas.toDataUri();
      console.log(e)
      scope.save('Data from directive', canvas);
      // scope.save()
    });
    // scope.save
    // enable drawing plugin and save element/api to editable
    // var editable = $el.find('#editableScreenshot').jqScribble({
    //   width: scope.screenshot.width,
    //   height: scope.screenshot.height
    // })`.data('jqScribble'); // api is stored in data

    // $el.find('[data-clear]').on('click', function(e) {
    //   e.preventDefault();
    //   editable.clear();
    // });

    // $el.find('[data-save]').on('click', function(e) {
    //   e.preventDefault();

    //   editable.save(function(imageData) {
    //     console.log(imageData);
    //   });
    // });
  
  };

  return directive;
}

angular
  .module('Archivr.directives.editableScreenshot', [])
  .directive('editableScreenshot', editableScreenshot);
