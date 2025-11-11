
////// DON'T MODIFY THESE VARIABLES
var _BEList = [];
var _BEClasses = [];
var _BEClassesByNames = [];
var JSONARR = [];
var _BEModels = []; // list of all BE Class models by class.
var _currentBEClass;
var _parameterList;
var _dynamicPoints = [];
var _orthoMode = false;
var _currentRotation = 0;

var _selectedElement;
var _selectedID;
var _currentLevel;
var _backgroundColor2D;

var scene3D, camera3D, renderer, controls, light;
var meshArr = [];
var ang = 0.0;
var div3D;
var MODELDATA = {};

// PLACE USER MODIFIABLE VARIABLES BELOW THIS LINE
var CANVAS_WIDTH = 600, CANVAS_HEIGHT = 400;
var WOOD=new THREE.TextureLoader().load("/static/assets/img/wood.jpg");
var _drawGrid = true;
var _snapToGrid = true;
var _gridScaleXY = 30;
var _grid2DXCount = 21;
var _grid2DYCount = 15;
var _orthoMode = false;
// var grid;


