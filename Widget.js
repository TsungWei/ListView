define(['dojo/_base/declare',
'jimu/BaseWidget',
'dojo/_base/lang',
'dojo/Deferred',
'dgrid/OnDemandList',
'dgrid/Selection',
"dojo/store/Memory"],
function(declare, BaseWidget,lang, Deferred,
  OnDemandList, Selection, Memory) {
  //To create a widget, you need to derive from BaseWidget.
  return declare([BaseWidget], {
    // DemoWidget code goes here

    //please note that this property is be set by the framework when widget is loaded.
    //templateString: template,

    baseClass: 'jimu-widget-ListView',

    postCreate: function() {
      this.inherited(arguments);
      //載入List
      this.createList();
      console.log('postCreate');
    },

    startup: function() {
      this.inherited(arguments);
      console.log('startup');
    },

    onOpen: function(){
      console.log('onOpen');
    },

    onClose: function(){
      console.log('onClose');
    },

    onMinimize: function(){
      console.log('onMinimize');
    },

    onMaximize: function(){
      console.log('onMaximize');
    },

    onSignIn: function(credential){
      /* jshint unused:false*/
      console.log('onSignIn');
    },

    onSignOut: function(){
      console.log('onSignOut');
    },

    showVertexCount: function(count){
      this.vertexCount.innerHTML = 'The vertex count is: ' + count;
    },
    
    getDataStore: function() {
      var def = new Deferred();
      // SAMPLE DATA
      var SAMPLEDATA = [{
        'id': 0,
        'title': 'Feature 1',
        'thumbnailImg': 'http://placehold.it/120x90'
      }, {
        'id': 1,
        'title': 'Feature 2',
        'thumbnailImg': 'http://placehold.it/120x90'
      }];
      def.resolve(new Memory({
        data: SAMPLEDATA
      }));
      return def;
    },
    
    createList: function() {
      this.getDataStore().then(lang.hitch(this, function(datastore) {
        var list = new (declare([OnDemandList, Selection]))({
          'store': datastore,
          'selectionMode': 'single',
          'renderRow': lang.hitch(this, function (object, options) {
            return this._createListItem(object);
          })
        }, this.ListNode);
        list.startup();
      }));
    },
    
    _createListItem: function(featureObj) {
      var listItemRoot = document.createElement('DIV');
      listItemRoot.className = 'list-item';
      if(featureObj) {
        var thumbnailImgWrapper, thumbnailImg, listItemTitle;
        // Create thumbnail
        if(featureObj.thumbnailImg) {
          thumbnailImgWrapper = document.createElement('div');
          thumbnailImgWrapper.className = 'thumbnail-wrapper';
          thumbnailImg = document.createElement('img');
          thumbnailImg.src = featureObj.thumbnailImg;
          thumbnailImgWrapper.appendChild(thumbnailImg);
          listItemRoot.appendChild(thumbnailImgWrapper);
        }
        // Create title
        if(featureObj.title && typeof featureObj.title === 'string') {
          listItemTitle = document.createElement('H4');
          listItemTitle.innerHTML = featureObj.title;
          listItemRoot.appendChild(listItemTitle);
          if(thumbnailImg)
            thumbnailImg.alt = featureObj.title;
        }
      } else {
        listItemRoot.innerHTML = 'NO DATA AVAILABLE';
      }

      return listItemRoot;
    },
    
    
  });
});