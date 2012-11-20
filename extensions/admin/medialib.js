/* **************************************************************

   Copyright 2011 Zoovy, Inc.

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.

************************************************************** */

/*
An extension for managing the media library in addition to ALL other file uploads,including, but not limited to: csv and zip.
*/



var admin_medialib = function() {
	var theseTemplates = new Array('mediaLibTemplate','mediaLibFolderTemplate','mediaFileTemplate','mediaLibFileDetailsTemplate','mediaLibSelectedFileTemplate','fileUploadTemplate');
	var r = {

////////////////////////////////////   CALLS    \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\		

	calls : {

		adminCSVImport : {
			init : function(obj,tagObj,Q)	{
				this.dispatch(obj,tagObj,Q);
				},
			dispatch : function(obj,tagObj,Q)	{
				obj._tag =  tagObj || {};
				obj._tag.datapointer = "adminCSVImport"
				obj._cmd = "adminCSVImport"
				app.model.addDispatchToQ(obj,Q);	
				}
			},


		adminImageDelete : {
			init : function(obj,tagObj,Q)	{
				this.dispatch(obj,tagObj,Q);
				},
			dispatch : function(obj,tagObj,Q)	{
				obj._tag =  tagObj || {};
				obj._cmd = "adminImageDelete"
				app.model.addDispatchToQ(obj,Q);	
				}
			}, //adminImageDelete

//f is filename
		adminImageDetail : {
			init : function(f,tagObj,Q)	{
				this.dispatch(f,tagObj,Q);
				},
			dispatch : function(f,tagObj,Q)	{
				tagObj = tagObj || {};
				tagObj.datapointer = "adminImageDetail|"+f
				app.model.addDispatchToQ({"_cmd":"adminImageDetail","file":f,"_tag" : tagObj},Q);	
				}
			}, //adminImageDetail

		adminImageFolderCreate : {
			init : function(f,tagObj,Q)	{
				this.dispatch(f,tagObj,Q);
				},
			dispatch : function(f,tagObj,Q)	{
				tagObj = tagObj || {};
				app.model.addDispatchToQ({"_cmd":"adminImageFolderCreate","folder":f,"_tag" : tagObj},Q);	
				}
			}, //adminImageFolderCreate

		adminImageFolderDelete : {
			init : function(f,tagObj,Q)	{
				this.dispatch(f,tagObj,Q);
				},
			dispatch : function(f,tagObj,Q)	{
				tagObj = tagObj || {};
				app.model.addDispatchToQ({"_cmd":"adminImageFolderDelete","folder":f,"_tag" : tagObj},Q);	
				}
			}, //adminImageFolderDelete


//f is filename
		adminImageFolderDetail : {
			init : function(f,tagObj,Q)	{
//				app.u.dump("BEGIN admin_medialib.calls.adminImageFolderDetail.init");
//				app.u.dump(" -> Q: "+Q);
//				app.u.dump(" -> tagObj: "); app.u.dump(tagObj);
				tagObj = tagObj || {};
				tagObj.datapointer = "adminImageFolderDetail|"+f
				if(app.model.fetchData(tagObj.datapointer) == false)	{
//					app.u.dump(" -> data is NOT local");
					r = 1;
					this.dispatch(f,tagObj,Q);
					}
				else	{
//					app.u.dump(" -> data IS local");
					app.u.handleCallback(tagObj);
					}
				},
			dispatch : function(f,tagObj,Q)	{
//				app.u.dump(" -> adding dispatch to "+Q+" queue");
				app.model.addDispatchToQ({"_cmd":"adminImageFolderDetail","folder":f,"_tag" : tagObj},Q);	
				}
			}, //adminImageDetail


		adminImageFolderList : {
			init : function(tagObj,Q)	{

tagObj = tagObj || {};
tagObj.datapointer = 'adminImageFolderList';
if(app.model.fetchData(tagObj.datapointer) == false)	{
	r = 1;
	this.dispatch(tagObj,Q);
	}
else	{
	app.u.handleCallback(tagObj);
	}
				},
			dispatch : function(tagObj,Q)	{
				tagObj = tagObj || {};
				tagObj.datapointer = "adminImageFolderList"
				app.model.addDispatchToQ({"_cmd":"adminImageFolderList","_tag" : tagObj},Q);	
				}
			}, //adminImageFolderList

//This implementation of the call does not support a 'data' for the file itself, it's used with the jqueryUI plugin, 
//which uploads the file to a location on the server where it is store temporarily, and returns a guid as part of that request.
		adminImageUpload : {
			init : function(obj,tagObj,Q){this.dispatch(obj,tagObj,Q);},
			dispatch : function(obj,tagObj,Q){
				obj._cmd = "adminImageUpload";
				obj._tag = tagObj || {};
				app.model.addDispatchToQ(obj,Q);
				}
			},


		adminPublicFileList : {
			init : function(tagObj,Q)	{
				tagObj = tagObj || {};
				tagObj.datapointer = 'adminPublicFileList';
				if(app.model.fetchData(tagObj.datapointer) == false)	{
					r = 1;
					this.dispatch(tagObj,Q);
					}
				else	{
					app.u.handleCallback(tagObj);
					}
				},
			dispatch : function(tagObj,Q)	{
				obj = {};
				obj._tag =  tagObj;
				obj._cmd = "adminPublicFileList"
				app.model.addDispatchToQ(obj,Q);	
				}
			}, //adminPublicFileList


		adminPublicFileUpload : {
			init : function(obj,tagObj,Q)	{
				this.dispatch(obj,tagObj,Q);
				},
			dispatch : function(obj,tagObj,Q)	{
				obj._tag =  tagObj || {};
				obj._cmd = "adminPublicFileUpload"
				app.model.addDispatchToQ(obj,Q);	
				}
			}, //adminPublicFileUpload

		adminPublicFileDelete : {
			init : function(filename,tagObj,Q)	{
				this.dispatch(filename,tagObj,Q);
				},
			dispatch : function(filename,tagObj,Q)	{
				var obj = {};
				obj.filename = filename;
				obj._tag =  tagObj || {};
				obj._cmd = "adminPublicFileDelete"
				app.model.addDispatchToQ(obj,Q);	
				}
			}, //adminPublicFileDelete


//obj should contain verb and src. for save, should include IMG
		adminUIMediaLibraryExecute : {
			init : function(obj,tagObj)	{
				this.dispatch(obj,tagObj);
				},
			dispatch : function(obj,tagObj)	{
				obj._cmd = "adminUIMediaLibraryExecute"
				obj._tag = tagObj || {};
				obj._tag.datapointer = 'adminUIMediaLibraryExecute|'+obj.verb;
				app.model.addDispatchToQ(obj,'immutable');	
				}
			}

		}, //calls




////////////////////////////////////   CALLBACKS    \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\



	callbacks : {
//executed when extension is loaded. should include any validation that needs to occur.
		init : {
			onSuccess : function()	{
				var r = true; //return false if extension won't load for some reason (account config, dependencies, etc).
				
				app.model.fetchNLoadTemplates(app.vars.baseURL+'extensions/admin/medialib.html',theseTemplates);


				app.rq.push(['css',0,app.vars.baseURL+'extensions/admin/resources/jquery.fileupload-ui.css','admin_medialib_fileupload_ui']); //CSS to style the file input field as button and adjust the jQuery UI progress bars
				app.rq.push(['css',0,app.vars.baseURL+'extensions/admin/resources/jquery.image-gallery.min.css','admin_medialib_imagegallery_ui']); //CSS to style the file input field as button and adjust the jQuery UI progress bars
				app.rq.push(['css',0,app.vars.baseURL+'extensions/admin/medialib.css','admin_medialib']); //our native css for presentation.

				app.rq.push(['script',0,app.vars.baseURL+'extensions/admin/resources/jquery.fileupload.js']); //
//here to solve a safari/chrome issue if these scripts load before fileupload.js
//not a great solution. will have to come up with something better. callback?
setTimeout(function(){
	app.rq.push(['script',0,app.vars.baseURL+'extensions/admin/resources/canvas-to-blob.min.js']); //
	app.rq.push(['script',0,app.vars.baseURL+'extensions/admin/resources/jquery.fileupload-fp.js']); //The File Upload file processing plugin
	app.rq.push(['script',0,app.vars.baseURL+'extensions/admin/resources/jquery.fileupload-ui.js']); //The File Upload user interface plugin
	app.rq.push(['script',0,app.vars.baseURL+'extensions/admin/resources/jquery.iframe-transport.js']); //The Iframe Transport is required for browsers without support for XHR file uploads
	app.rq.push(['script',0,app.vars.baseURL+'extensions/admin/resources/jquery.image-gallery.min.js']); //The Canvas to Blob plugin is included for image resizing functionality
	app.rq.push(['script',0,app.vars.baseURL+'extensions/admin/resources/jquery.fileupload-jui.js']); //The File Upload jqueryui plugin	
	},3000);


//mediaLibrary shortcut is the function B executes from his content. his params are different than showMediaLib. don't change this shortcut.
//B may also trigger medialibrary by linking to #mediaLibModeManage. This case gets handled in admin.u.handleLinkRewrites.
				window.mediaLibrary = app.ext.admin_medialib.a.uiShowMediaLib 
				
				return r;
				},
			onError : function()	{
//errors will get reported for this callback as part of the extensions loading.  This is here for extra error handling purposes.
//you may or may not need it.
				app.u.dump('BEGIN admin_orders.callbacks.init.onError');
				}
			}, //init

		showMediaLibrary : {
			
			onSuccess : function(tagObj){
//				app.u.dump("BEGIN admin_medialib.callbacks.showMediaLibrary.onSuccess");
				$('#'+tagObj.parentID).removeClass('loadingBG');
				var L = app.data[tagObj.datapointer]['@folders'].length;
				var $template; //recycled. holds template till appended to parent.
//				app.u.dump(" -> @folders.length: "+L);
				for(var i = 0; i < L; i += 1)	{
//					app.u.dump(" -> FID: "+app.data[tagObj.datapointer]['@folders'][i].FID+" and parentFID: "+app.data[tagObj.datapointer]['@folders'][i].ParentFID);
					app.data[tagObj.datapointer]['@folders'][i].id = '#mediaRootFolder_'+app.data[tagObj.datapointer]['@folders'][i].FName //the id given to each root folders.
					$template = app.renderFunctions.transmogrify(app.data[tagObj.datapointer]['@folders'][i],'mediaLibFolderTemplate',app.data[tagObj.datapointer]['@folders'][i]);
					Number(app.data[tagObj.datapointer]['@folders'][i].ParentFID) ? $('#mediaChildren_'+app.u.makeSafeHTMLId(app.data[tagObj.datapointer]['@folders'][i].ParentFID)).append($template) : $('#mediaLibFolderListUL').append($template); //add either to the parent folders ul or to the root list.
					}
				app.ext.admin_medialib.u.convertFormToJQFU('#mediaLibUploadForm','mediaLibrary');
//in some cases, we may re-run this callback (such as after a file upload) and we need to open the folder on the left and in the media area opened for continuity.
				if(app.ext.admin_medialib.u.getOpenFolderName())	{app.ext.admin_medialib.u.openMediaFolderByFilePath(app.ext.admin_medialib.u.getOpenFolderName())}
				}
			
			}, //showMediaLibrary
			
		handleMediaLibSrc : {
			onSuccess : function(tagObj){
				app.u.dump("BEGIN admin_medialib.callbacks.handleMediaLibSrc.onSuccess");
				var img = app.data[tagObj.datapointer].IMG;
				var $target = $('#mediaLibraryFocusMediaDetails').show();
				$target.append(app.renderFunctions.transmogrify({'path':app.data[tagObj.datapointer].IMG,'name':app.data[tagObj.datapointer].IMG},'mediaLibSelectedFileTemplate',app.data[tagObj.datapointer]));
				app.ext.admin_medialib.u.handleMediaFileButtons($target)

				}
			},//handleMediaLibUpdate, //showMediaLibrary
			
		
		handleFileUpload2Batch : {
			onSuccess : function(tagObj){
				var jobID = app.data[tagObj.datapointer].JOBID;
				$("<div \/>").attr({'id':'batchDialog_'+jobID,'title':'Job ID: '+jobID}).append("<p class='pointer' onClick='showUI(\"/biz/batch/index.cgi?VERB=LOAD&JOB="+jobID+"\")'>File uploaded. <span class='lookLikeLink'>click here</span> to see job status. job id: "+jobID+"<\/p>").dialog();
				}
			},
		
		handlePublicFilesList : {
			onSuccess: function(tagObj)	{
				var data = app.data[tagObj.datapointer]['@files'];
				$ul = $("<ul \/>");
				var L = data.length;
// the delete below is a fairly benign delete. report errors, but no need updated the entire files list again, just remove the line from the dom.
// errors will get reported and, if the file doesn't delete, it'll always be here next time for deletion.
				for(var i = 0; i < L; i += 1)	{
					$ul.append($("<li>").html("[ <a href='#' onClick=\"app.ext.admin_medialib.calls.adminPublicFileDelete.init('"+data[i].file+"',{},'passive');  $(this).parent().empty().remove(); return false;\">del<\/a> ] <a href='"+data[i]['link']+"' target='_blank' >"+data[i].file+"<\/a>"));
					}
				 $('#publicFilesList').empty().removeClass('loadingBG').append($ul.children());
				},
			},	
			
		handleImageUpload : {
			onSuccess : function(tagObj){
				$("[data-filename='"+app.u.jqSelector('',tagObj.filename)+"']",$('#mediaLibraryFileUploadTable')).slideUp(1000,function(){$(this).empty().remove()})
				}
			},
		handleMediaLibUpdate : {
			onSuccess : function(tagObj){
				$('#mediaModal').dialog('close');
				}
			}//handleMediaLibUpdate
		}, //callbacks




////////////////////////////////////   ACTION    \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

		a : {

//media library gets used a lot.  
// -> builder.
// -> product editor.
// -> setup tab.

			showMediaLib : function(P){
				var $target = $('#mediaModal');
//				app.u.dump(" -> P: "); app.u.dump(P);

//mode typically isn't needed. It is added to the ul containing the 'list' and when that list is run through the templating engine, mode can be used to change behaviors.
//for instance, mode = 'manage' will turn off the 'select' icons and not add an onclick to the images.
				P.mode = P.mode || 'unset' 
				if($target.length)	{
//this is where the contents for what media is currently selected go. Needs to be emptied each time so old contents don't show up.
//also hidden by default. will be set to visible if populated (keep buttons from showing up)
					$('#mediaLibraryFocusMediaDetails').empty().hide();
					} //media lib has already been created.
//media library hasn't been opened yet. Add to dom and add properties that only get added once.
				else	{
					$target = $("<div \/>").attr({'id':'mediaModal','title':'Media Library'}).addClass('loadingBG').appendTo('body');
//by adding the template instance only once, the media lib will re-open showing last edited folder. 
					$target.append(app.renderFunctions.createTemplateInstance('mediaLibTemplate'));
					$target.dialog({'autoOpen':false,'modal':true, width:'90%', height: 500});
					
					app.ext.admin_medialib.u.handleMediaLibButtons($target);
					
					app.ext.admin_medialib.calls.adminImageFolderList.init({'callback':'showMediaLibrary','extension':'admin_medialib','parentID':'mediaModal','templateID':'mediaLibTemplate'},'immutable');

					}
				if(P.src)	{
					app.ext.admin_medialib.calls.adminUIMediaLibraryExecute.init({'verb':'LOAD','src':P.src},{'callback':'handleMediaLibSrc','extension':'admin_medialib'});
					}
				app.model.dispatchThis('immutable');
				$('#mediaLibFileList ul').data('mode',P.mode);
//				app.u.dump("Media library setting data: "); app.u.dump(P);
				$target.data(P); //put all the params into the object's data for easy lookup later (when a file is selected, for instance)
				$target.dialog('open');
				}, //showMediaLib

//first param is thumbnail object on page.
//second param is string (src in api call) or object (ref to text input, hidden, something). must determine
//third param is The title.
//showMediaLib appends this info as data to the mediaLib object. didn't want two jq objects appended in this manner, so their id's are used. 
// -> if no id's exist, they're assigned.
			uiShowMediaLib : function($image,strOrObj,title){
//the first two params are required and the first must be a jquery object.
				if(typeof $image == 'object' && strOrObj)		{
//P is added to media library instance using data, and I didn't want an entire jq object there (or two, potentially)
					var imageID; 
					if($image.attr('id'))	{imageID = $image.attr('id')}
					else	{
						imageID = 'image_'+app.u.guidGenerator()
						$image.attr('id',imageID)
						}

					var P = {'imageID':'#'+imageID,'title':title};
	//see note about imageID on why this isn't being passed straight through.
	//also, because this is passed into the media library as a string, the string or object distinction is done here and passed in with different keys.
	//selector is passed instead of ID to be more versatile. The mediaLib itself may end up using a class.
					if(typeof strOrObj == 'object')	{
						if(strOrObj.attr('id'))	{P.eleSelector = '#'+strOrObj.attr('id')}
						else	{
							P.eleSelector = 'input_'+app.u.guidGenerator();
							strOrObj.attr('id',P.eleSelector);
							}
						}
					else if(typeof strOrObj == 'string')	{P.src = strOrObj;}
					app.ext.admin_medialib.a.showMediaLib(P);
					}
				else	{
					app.u.throwGMessage("WARNING! invalid or missing params in admin_media.a.uiShowMediaLib. typeof $image = ["+typeof $image+"] and val strOrObj = ["+strOrObj+"]")
					}
				}, //uiShowMediaLib

//This is what's executed when a file in the media library is selected.
//$obj = jquery object of image container. properties for data-fid and some others will be set.
//in some cases, this function is executed when returning the value of the attribute to blank. when that's the case, set2Blank will b true.
			selectThisMedia : function($obj,set2Blank){

//the image is what's clickable, but the data is in a parent container. don't just check parent().data() because template may change and img could be nested lower.
				var fileInfo = $obj.closest('[data-path]').data();
				var newFilename = (set2Blank === true) ? '' : fileInfo.path; //set2Blank 
				var $medialib = $('#mediaModal');
				$medialib.showLoading();
				var mediaData = $medialib.data();
//				app.u.dump("mediaData: "); app.u.dump(mediaData);
//				app.u.dump("fileInfo: "); app.u.dump(fileInfo);
				var error = false;
//imageID should always be set. And the presence of eleSelector or mode determines the action.
//eleSelector just updates some form on the page.
//mode requires an API call.
				if(mediaData.imageID && ( mediaData.eleSelector ||  mediaData.src))	{
//update the image on the page to show what has been selected.
					if(mediaData.imageID)	{
						var $image = $(mediaData.imageID);
//						app.u.dump(app.u.makeImage({'tag':0,'w':$image.attr('width'),'h':$image.attr('height'),'name':newFilename,'b':'ffffff'}));
						$image.attr({
							'src':app.u.makeImage({'tag':0,'w':$image.attr('width'),'h':$image.attr('height'),'name':newFilename,'b':'ffffff'}),
							'alt':fileInfo.Name
							});
						}
//update form element
					if(mediaData.eleSelector){
						$(mediaData.eleSelector).val(newFilename);
						$medialib.dialog('close');
						}
//selector OR mode WILL be set by the time we get here.
					else	{
						app.ext.admin_medialib.calls.adminUIMediaLibraryExecute.init({'verb':'SAVE','src':mediaData.src,'IMG':newFilename},{'callback':'handleMediaLibUpdate','extension':'admin_medialib'});
						app.model.dispatchThis('immutable');
						}
					}
				else	{
					error = true;
					app.u.throwGMessage("WARNING! Required params for admin_medialib.selectThisMedia not available.");
					app.u.dump(" -> imageID or eleSelector must be set:"); app.u.dump(mediaData);
					app.u.dump(" -> path must be set. Name would be nice"); app.u.dump(fileInfo);
					} //something is amiss. required params not avail.
				$medialib.hideLoading();
				}, //selectThisMedia

			showFoldersFor : function(P)	{
				if(P.targetID && P.templateID)	{
					P.parentFID = P.parentFID || "0"; //default to showing root level folders.
					$('#'+P.targetID).append(app.ext.admin_medialib.u.showFoldersByParentFID(P.parentFID,P.templateID));
					}
				else	{
					//required params missing.
					app.u.throwGMessage("WARNING! some required params for admin_medialib.a.showFoldersFor were missing. targetID and templateID are required. Params follow:");
					app.u.dump(P);
					}
				}, //showFoldersFor

//Executed when 'info' button is clicked for a piece of media. Opens details in a dialog.
			showMediaDetailsInDialog : function(P){
				if(P.name)	{
					var safeID = 'mediaFileDetails_'+app.u.makeSafeHTMLId(P.name)
					var $target = $('#'+safeID);
					if($target.length){} //contents already created. do nothing.
//contents not generated yet. Create them.
					else	{
						$target = $("<div \/>").attr({'id':safeID,'title':P.name}).appendTo('body');
						$target.dialog({autoOpen:false,width:500,height:350,modal:true});
						$target.append(app.renderFunctions.createTemplateInstance('mediaLibFileDetailsTemplate'));
						app.ext.admin_medialib.calls.adminImageDetail.init(P.path,{'callback':'translateTemplate','parentID':safeID});
						app.model.dispatchThis();
						}
					$target.addClass('loadingBG').dialog('open');
					}
				else	{
					app.u.throwGMessage("WARNING! params required for admin_medialib.a.showMediaDetailsInDialog missing. name is required:");
					app.u.dump(P);
					}
				}, //showMediaDetailsInDialog
			
			showMediaAndSubs : function(folderProperties){
				if(!$.isEmptyObject(folderProperties) && folderProperties.fid)	{
					var $mediaTarget = $('#mediaLibFileList ul');
					app.model.abortQ('mutable'); //if folders are clicked in quick succession, incomplete requests should get cancelled so their results don't show up.
//SANITY -> folderProperties loads from data() on the li. which means, all variable names will be lowercase for browser compatibility.
					
					var $folderTarget = $('#mediaChildren_'+folderProperties.fid); //ul for folder children.

					$('.ui-selected','#mediaLibFolderList').removeClass('ui-selected');

					$folderTarget.toggle(); //allows folders to be opened and closed.
					$folderTarget.parent().find('a:first').addClass('ui-selected');
	//updates the text in the folder dropdown to allow the user to make the selection for where a new folder is created.
					$('#mediaLibActionsBar .selectAddFolderChoices li:last').show().trigger('click').text("As child of "+folderProperties.fname).data('path',folderProperties.fname);
					$('#mediaLibActionsBar .addMediaFilesBtn').attr('title','select files for upload to this folder').button('enable'); //the button is disabled by default (can't add files to root) and during the delete folder process.
	//now handle the delete folder button. Folders with subfolders can not be deleted.
	//updates the delete folder button with attributes of what folder is in focus so the button knows what folder to delete.
	//if children are present, lock the disable folder button.
	//this code must be run after the subfolders have been added or children().length won't be accurate.
					$('#mediaLibActionsBar .deleteFolderBtn .folderid').text(folderProperties.fname);
	
					if($folderTarget.children().length)	{
						$('#mediaLibActionsBar .deleteFolderBtn').button('disable').attr('title','unable to delete because subfolders are present').data({'focus-folder-id':folderProperties.fid,'focus-folder-name':folderProperties.fname})
						} 
					else	{
						$('#mediaLibActionsBar .deleteFolderBtn').button('enable').attr('title','delete folder '+folderProperties.fname).data({'focus-folder-id':folderProperties.fid,'focus-folder-name':folderProperties.fname})
						}
						
					//show files.
					if(folderProperties.fname)	{
						$mediaTarget.attr({'data-fid':folderProperties.fid,'data-fname':folderProperties.fname});
						app.ext.admin_medialib.u.showMediaFor({'FName':folderProperties.fname,'selector':'#mediaLibFileList'});
						app.model.dispatchThis();
						}
					}
				else	{
					app.u.throwGMessage("WARNING! admin_medialib.a.showMediaAndSubs folderProperties not set and/or folderproperties.fid not set.");
					app.u.dump(folderProperties);
					}
				
				} //showMediaAndSubs

			}, //Actions

////////////////////////////////////   RENDERFORMATS    \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

		renderFormats : {
			showChildFolders : function($tag,data){
				app.u.dump("BEGIN admin_medialib.renderFormats.showChildFolders");
				$tag.append(app.ext.admin_medialib.u.showFoldersByParentFID(data.value,data.bindData.loadsTemplate));
				}, //showChildFolders

//used in the 'mediaLibSelectedFileTemplate'. shows the file name/path as a link and, when clicked, that folder is opened.
//currently, the entire output links to the same place. long term, each link in the path should be linkable.
			mediaFilePathAsLinks : function($tag,data)	{
				var $a = $("<a \/>").attr('href','#').click(function(event){
					event.preventDefault();
					app.ext.admin_medialib.u.openMediaFolderByFilePath($(this).text());
					}).text(data.value);
				$tag.append($a);
				},
			
//the click event is added to the image, not the li. Otherwise, any elements added (such as the delete or details button), the click event would trickle to.
//The data is set on the li though, so that any elements added, such as the checkbox, could look up that info easily through closest(li).data()
			mediaList : function($tag,data)	{

//				app.u.dump("BEGIN renderFormats.array2Template");
//				app.u.dump(data.value);
				var L = data.value.length;
//				app.u.dump(" -> L: "+L);
				$tag.removeClass('loadingBG');

				var val; //recycled. set to path/filename.
				var FName = $tag.closest('[data-fname]').attr('data-fname');
				if(FName && data.bindData.loadsTemplate)	{
					for(var i = 0; i < L; i += 1)	{
//update data.value[i] with path and id, then pass this entire object into transmogrify so all the values are stored in data for use later on
//SANITY - FName is set to be consistent when this data is passed for interpolation (transmogrify param 3), but when data- is set (param 1) lowercase is used for browser compatiblity.
						data.value[i].path = FName+"/"+data.value[i].Name;
						data.value[i].FName = FName;
						data.value[i].id = 'mediaFile_'+i;
						$tag.append(app.renderFunctions.transmogrify(data.value[i],data.bindData.loadsTemplate,data.value[i])); 
						}
//mode is set on the UL when the media library is initialized or reopened.
					if($tag.data('mode') == 'manage')	{
						$tag.addClass('hideBtnSelect')
						}
					else	{
						$tag.removeClass('hideBtnSelect')
						$('img',$tag).addClass('pointer').click(function(){
							app.ext.admin_medialib.a.selectThisMedia($(this));
							});
						}

					app.ext.admin_medialib.u.handleMediaFileButtons($("li",$tag));

					}
				else	{
					app.u.throwGMessage("admin_medialib.renderFormats.mediaList unable to determine folder name (hint: should be set on parent ul as data-fname) or templateid [data.bindData.loadsTemplate: "+data.bindData.loadsTemplate+"].");
					}
				} //mediaList
			}, //renderFormats
////////////////////////////////////   UTIL [u]   \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


		u : {

//a way to consistently get the folder name for what folder is open. 
//is a function to regularize it and so that if where the name is stored changes, only one update needs to be made.
			getOpenFolderName : function(){
				return $('#mediaLibFileList ul').attr('data-fname');
				},

//this is what 'was' in main.js for jquery file upload. but it was too specific and I needed one where I could set the selector.
//JQFU = JQuery File Upload.
//this turns the upload form into a jquery file upload.
//currently supported modes are: mediaLibrary
//the mode set will impact the success callback.

			convertFormToJQFU : function(selector,mode)	{




'use strict';

var successCallbacks = {
//The dispatches in this request are immutable. the imageUpload and updates need to happen at the same time to provide a good UX and the image creation should be immutable.
	'mediaLibrary' : function(data,textStatus){
		var L = data.length;
		var $ul = $('.dataMap',$('#mediaLibUploadForm')); //container of data mapping (a ul). each li contains a filename and fname data attribute.
		var $li,tagObj;
		var folders = new Array(); //a list of folders that were updated. will be used to compile a list of 
		for(var i = 0; i < L; i += 1)	{
			$li = $("[data-filename="+app.u.jqSelector('',data[i].filename)+"]",$ul);
			data[i].folder = $li.attr('data-fname');
//			app.u.dump(i+"). "+data[i].filename+" goes into: "+data[i].folder);
		//append to list of folders if not already there.
			if($.inArray(data[i].folder,folders) == -1){folders.push(data[i].folder)}
			app.ext.admin_medialib.calls.adminImageUpload.init(data[i],{'callback':'handleImageUpload','extension':'admin_medialib','filename':data[i].filename},'immutable'); //on a successful response, add the file to the media library.
			$li.empty().remove(); //remove this from list so future lookups are quicker.
			}
		//update memory/localStorage with folder contents.
		for(var index in folders)	{
			//no callback needed on any of the requests for updating the folders. A 'click' on the folder will get triggered on reload. to open it and it's new contents.
			app.model.destroy('adminImageFolderDetail|'+folders[index]);
			app.ext.admin_medialib.calls.adminImageFolderDetail.init(folders[index],{},'immutable');
			}

		app.ext.admin_medialib.u.resetAndGetMediaFolders('immutable'); //will empty list and create dispatch.
		//dispatch occurs as part of the fileuploadstopped bind specific to the media lib.

		},
	'publicFileUpload' : function(data,textStatus)	{
		app.u.dump("Got to csvUploadToBatch success.");
		app.ext.admin_medialib.calls.adminPublicFileUpload.init(data[0],{'callback':'handleFileUpload2Batch','extension':'admin'},'immutable');
		app.model.dispatchThis('immutable');
		},
	'csvUploadToBatch' : function(data,textStatus) {
		app.u.dump("Got to csvUploadToBatch success.");
//		app.u.dump(" -> data:"); app.u.dump(data);
//		data[0].filetype = 'PRODUCT'; //tho only 1 csv can be uploaded at a time, the response is still nested because it's shared across all file uploads.
		app.ext.admin_medialib.calls.adminCSVImport.init($.extend(data[0],$('#csvUploadToBatchForm').serializeJSON()),{'callback':'handleFileUpload2Batch','extension':'admin_medialib'},'immutable');
		app.model.dispatchThis('immutable');
		}
	}

// Initialize the jQuery File Upload widget:
$(selector).fileupload({
	// Uncomment the following to send cross-domain cookies:
	//xhrFields: {withCredentials: true},
	url: '//www.zoovy.com/webapi/jquery/fileupload.cgi', //don't hard code to http or https. breaks safari and chrome.
	maxNumberOfFiles : (mode == 'csvUploadToBatch') ? 1 : null, //for csv uploads, allow only 1 file to be selected.
	success : function(data,textStatus){
//		app.u.dump(" -> mode:  "+mode+" data: "); app.u.dump(data);
		successCallbacks[mode](data,textStatus);
		}
	})

if(mode == 'mediaLibrary')	{
	$(selector).bind('fileuploadstopped',function(){
		app.ext.admin_medialib.u.resetAndGetMediaFolders('immutable'); //will empty list and create dispatch.
		app.model.dispatchThis('immutable');
		app.u.dump("Gets run just once");
		}).bind('fileuploadadd', function (e, data) {
		var fname = app.ext.admin_medialib.u.getOpenFolderName(); //save var so that lookup only needs to occur once instead of in each iteration.
		var $li; //recycled in loop. jq object of the row in the file table.
		var L = data.files.length; //an array of the files just added.

//this bind adds fname to an li in a ul that holds the list of uploads.
//its used in the callback to set which folder should be used when moving the file from the tmp folder to the media lib.
//can't use the table because the JQ file upload plugin rewrites that before the success response is executed and any data attribs are lost.
		for(var i = 0; i < L; i += 1)	{
			$li = $("<li \/>").attr({'data-filename':data.files[i].name,'data-fname':fname}).text(fname);
			$('.dataMap',$(this)).append($li);
			}
		});
	}

// Enable iframe cross-domain access via redirect option:
$(selector).fileupload(
	'option',
	'redirect',
	window.location.href.replace(/\/[^\/]*$/,'/cors/result.html?%s')
	);


//$('.btn-success',$(selector)).on('click', function(){$(".fileUploadButtonBar").show()});



				
				}, //convertFormToJQFU

			getFolderInfoFromFID : function(FID)	{
				var r = false; //what is returned. Will be an object if FID is a valid folder id.
				var L = app.data.adminImageFolderList['@folders'].length;
				for(var i = 0; i < L; i += 1)	{
					if(app.data.adminImageFolderList['@folders'][i].FID == FID){
						r = app.data.adminImageFolderList['@folders'][i]
						break
						}
					}
				return r;
				}, //getFolderInfoFromFID

//Will show the images for a given folder. Handles requesting the data.
// selector is a jquery selector (#something) of what gets translated. the entire selector gets translated.
//FName is the folder name (pretty). FID won't work.
			showMediaFor : function(P,Q)	{
				$('.welcomeMessage','#mediaLibFileList').hide(); //make sure welcome message is off.
				if(P.selector && P.FName)	{
					$(P.selector + ' ul').empty().addClass('loadingBG');
					P.callback = 'translateSelector'
					app.ext.admin_medialib.calls.adminImageFolderDetail.init(P.FName,P,Q || 'mutable');
					}
				else	{
					//required params missing.
					app.u.throwGMessage("WARNING! some required params for admin_medialib.a.showMediaFor were missing. selector and FName are required. Params follow:");
					app.u.dump(P);
					}
				}, //showMediaFor

			showFoldersByParentFID : function(FID,templateID){
//				app.u.dump("BEGIN admin_medialib.u.showFoldersByParentFID");
				var $ul = $("<ul \/>"); //used to store the translated templates so that the dom can be updated just once. children are returned. 0 for none.
				if(FID && templateID)	{
					var L = app.data.adminImageFolderList['@folders'].length;
//					app.u.dump(" -> L: "+L);
//					app.u.dump(" -> FID: "+FID);
	//loop through all the folders and translate a template for each where the parentName matches the value passed in (which is the parentFID).
					for(var i = 0; i < L; i += 1)	{
						if(app.data.adminImageFolderList['@folders'][i].ParentFID == FID)	{
							$ul.append(app.renderFunctions.transmogrify({'folderid':app.data.adminImageFolderList['@folders'][i].FID,'id':'mediaLibFolder_'+app.data.adminImageFolderList['@folders'][i].FID},templateID,app.data.adminImageFolderList['@folders'][i]));
							}
						else	{
							//no match. do nothing.
							}
						}
					}
				else	{
					app.u.throwGMessage("WARNING! params required for admin_medialib.u.showFoldersByName not set.");
					app.u.dump(" -> FID: "+FID);
					app.u.dump(" -> templateID: "+templateID);
					}
//				app.u.dump(" -> # children: "+$ul.children().length);
				return $ul.children();
				}, //showFoldersByParentFID
			
			buildDeleteMediaRequests : function(){
				$('#mediaLibFileList .btnDelete').each(function(){
					if($(this).hasClass('ui-state-highlight'))	{
						var data = $(this).closest('li').data();
						app.ext.admin_medialib.calls.adminImageDelete.init({'folder':data.fname,'file':data.name},{},'immutable');
						}
					else	{} //do nothing.
					});
				}, //buildDeleteMediaRequests

//pass in a foldername "7" or "7/x/y" and the corresponding folder in the medialib nav will get triggered. (opened including showing media)
//the root LI's contain UL's with their FID in the ID. (mediaChildren_FID) (arguably, should have been mediaChildrenOf_ to indicate better).
//each of these UL's contain all the properties of the parent folder. fid, fname, etc
			openMediaFolderByFilePath : function(path)	{
				app.u.dump("BEGIN admin_medialib.u.openMediaFolderByFilePath ["+path+"]");
//if no slashes or periods, is a root category.
				if(path && path.indexOf('/') == -1 && path.indexOf('.') == -1){
					$('#mediaRootFolder_'+path+' a:first').click();
					}
				else if(path)	{
					
					var pathArray = path.split('/');
					var path2Now = pathArray[0]; //puts path back together again. each pass it adds a folder back, starting with the root and working down 2 the last.
					var L = (path.indexOf('.') > -1) ? pathArray.length - 1 : pathArray.length; //if last spot is filename, ignore.
					app.u.dump(" -> L: "+L);
					var $rootCat = $('#mediaRootFolder_'+pathArray[0])
					var fid = $rootCat.data('fid'); //root folder has fname in the id, but all properties in data.
					var $tmp;
					$('#mediaChildren_'+fid).toggle(); //turn first set of subfolders.
					if(L == 1)	{
						$('#mediaRootFolder_'+pathArray[0]+' a:first').click();
						}
					else	{
//in loop, we can skip the root category logic (start at 1 instead of 0).
// If path is a root folder (no subs), the 'if' above takes care of it.
// and the code earlier in this block opens the first subfolder.
						for(i = 1; i < L; i += 1)	{
							path2Now += "/"+pathArray[i];
							app.u.dump(i+") path2Now: "+path2Now+" and fid: "+fid);
							$tmp = $("[data-fname='"+app.u.jqSelector('',path2Now)+"']",$rootCat);
							if($tmp.data('fname') == path2Now)	{$("a:first",$tmp).click();}
							else	{$("ul",$tmp).toggle()} //don't activate click, which would trigger an ajax request. just open it.
							}
						}
					}
				else	{
					app.u.throwGMessage("WARNING! no path specified an admin_medialib.u.openMediaFoldersByFilePath.");
					}

				},

			resetAndGetMediaFolders : function(Q)	{
				$('ul','#mediaLibFolderList').addClass('loadingBG').children().remove(); //folders will be re-added later.
				app.model.destroy('adminImageFolderList');
				app.ext.admin_medialib.calls.adminImageFolderList.init({'callback':'showMediaLibrary','extension':'admin_medialib','parentID':'mediaModal','templateID':'mediaLibTemplate'},Q);
				},

//This gets run over individual media files (each image).
//also gets run over the image details area in the header when opening media lib for a field that already has an image selected.
			handleMediaFileButtons : function($target)	{
				$('button',$target).each(function(){
					var $button = $(this);
					if($button.data('btn-action') == 'delete')	{
						$button.addClass('btnDelete').button({text:false,icons: {primary: "ui-icon-trash"}}).click(function(event){
							event.preventDefault(); //keeps button from submitting the form.
							$(this).toggleClass('ui-state-highlight');
							})
						}
					
					else if($button.data('btn-action') == 'clearMedia')	{
						$button.addClass('btnClear').button({text:false,icons: {primary: "ui-icon-circle-close"}}).click(function(event){
							event.preventDefault(); //keeps button from submitting the form.
							app.ext.admin_medialib.a.selectThisMedia($(this),true);
							})
						}
					else if($button.data('btn-action') == 'select')	{
						$button.addClass('btnSelect').button({text:false,icons: {primary: "ui-icon-check"}}).click(function(event){
							event.preventDefault(); //keeps button from submitting the form.
							$(this).closest('li').find('img').click();
							})
						}
					else if($button.data('btn-action') == 'details')	{
						$button.addClass('btnDetails').button({text:false,icons: {primary: "ui-icon-info"}}).click(function(event){
							event.preventDefault(); //keeps button from submitting the form.
							app.ext.admin_medialib.a.showMediaDetailsInDialog($(this).closest('[data-path]').data())
							})
						}
					else if($button.data('btn-action') == 'download')	{
						$button.addClass('btnDownload').button({text:false,icons: {primary: "ui-icon-image"}}).click(function(event){
							event.preventDefault(); //keeps button from submitting the form.
							window.open(app.u.makeImage({'name':$(this).closest('[data-path]').data('path')}));
							})
						}
					else	{
						//unknown type. do nothing to it (no .button) so it's easily identified.
						}
					})
				}, //handleMediaFileButtons


//these are the actions on the tool bar row of buttons, not the individual photo/media buttons.
			handleMediaLibButtons : function($target){

$('#mediaLibActionsBar button',$target).each(function(){

	var $button = $(this);
	if($button.data('btn-action') == 'deleteSelected')	{
		$button.button({icons: {primary: "ui-icon-trash"}}).click(function(event){
			event.preventDefault(); //keeps button from submitting the form.
			app.ext.admin_medialib.u.buildDeleteMediaRequests();
			var fname = app.ext.admin_medialib.u.getOpenFolderName();
			app.model.destroy('adminImageFolderDetail|'+fname);
			app.ext.admin_medialib.u.showMediaFor({'FName':fname,'selector':'#mediaLibFileList'},'immutable');
			app.model.dispatchThis('immutable');
			//also re-request this folder detail and reload and set ul to loadingBG.
			//dispatch.
			})
		}
	else if($button.data('btn-action') == 'selectUploads')	{
		$button.attr('title','create and/or select a folder to add files to').button({icons: {primary: "ui-icon-plus"}}).click(function(event){
			event.preventDefault(); //keeps button from submitting the form.
	//		app.u.dump("Uploads Button Pushed.");
			$('.fileUploadButtonBar',$target).show();
			$('[type=file]',$target).click();
			})
		$button.button('disable');
		}
	else if($button.data('btn-action') == 'deleteFolder')	{
		$button.addClass('deleteFolderBtn').button({icons: {primary: "ui-icon-trash"}}).click(function(event){
			event.preventDefault(); //keeps button from submitting the form.
			var numMediaFiles = $('#mediaLibFileList ul').children().length;
			var folderInfo = $button.data();

//There are two ways to get to the delete code within this function (has subfolders, has no subfolders) so a function is used.
			function deleteFolder(numMF){
//				app.u.dump(" -> folderInfo: "); app.u.dump(folderInfo);
//disable these buttons because the folder in focus will no longer exist in a moment.
				$('#mediaLibActionsBar .addMediaFilesBtn').button('disable');
				$('#mediaLibActionsBar .deleteFolderBtn').button('disable'); 
				$('#mediaLibActionsBar .selectAddFolderChoices li:last').hide(); //hide the 'as child of...' option in the add folder menu. it is targeted to the folder being deleted, which is about to no longer exist.

//now, add requests to the Q for all the media files to be deleted.
				if(numMF > 0)	{
					$('#mediaLibFileList .btnDelete').each(function(){$(this).click()});
					app.ext.admin_medialib.u.buildDeleteMediaRequests();
					}
//if not a root folder, bring the parent folder into focus.
//folderInfo['focus-folder-name'] can = 2, a number, in which case indexOf is barfing. If it IS a number, it's automatically a root folder so we can safely treat it so.
				if(typeof folderInfo['focus-folder-name'] == 'string' && folderInfo['focus-folder-name'].indexOf('/') > -1 )	{
					var fname = folderInfo['focus-folder-name'].substring(0,folderInfo['focus-folder-name'].lastIndexOf('/'));
					app.model.destroy('adminImageFolderDetail|'+fname);
					app.ext.admin_medialib.u.showMediaFor({'FName':fname,'selector':'#mediaLibFileList'},'immutable');
					}
				else	{} // a root folder is being deleted. There are no images in root, so don't show anything in the files area.
//next, delete the folder.

				app.ext.admin_medialib.calls.adminImageFolderDelete.init(folderInfo['focus-folder-name'],{},'immutable');
				app.ext.admin_medialib.u.resetAndGetMediaFolders('immutable'); //will empty list and create dispatch.
				app.model.dispatchThis('immutable');

				} //deleteFolder
				
//If mediafiles are present in this folder, confirm with the user that they want to delete both the folder AND the media files.			
			if(numMediaFiles > 0)	{
				var $newDialog = $('<div \/>').attr('id','mediaFolderDeleteConfirmDialog').append("<p>The folder you are about to delete contains "+numMediaFiles+" media files. Please confirm you want to delete the folder and all "+numMediaFiles+" media files within.<\/p><p>This action can not be undone<\/p>");
				$newDialog.dialog({
					modal: true,
					title: "title",
					show: 'clip',
					hide: 'clip',
					buttons: [
						{text: "Proceed", click: function() {
							deleteFolder(numMediaFiles);
							$(this).dialog("close");
							}},
						{text: "Cancel", click: function() {$(this).dialog("close")}}
						]
					});
				}
			else	{
				deleteFolder(numMediaFiles);
				}
			})
		}
	else if($button.data('btn-action') == 'addFolder')	{
		$button.button({icons: {primary: "ui-icon-folder-collapsed"}}).click(function(event){
			event.preventDefault(); //keeps button from submitting the form.
	//		app.u.dump("Uploads Button Pushed.");
			$button.parent().find('ul').hide();
			if($('#mediaLibNewFolderName').val())	{
				var folderName; //uses either the value of the text input or prepends a path to it.
				if($('#mediaLibActionsBar .selectAddFolderChoices .ui-selectee').data('path') != '')	{
					folderName = $('#mediaLibActionsBar .selectAddFolderChoices .ui-selected').data('path')+'/'+$('#mediaLibNewFolderName').val()
					} //create a sub level folder.
				else	{folderName = $('#mediaLibNewFolderName').val()} //create a root level folder.
				

				app.ext.admin_medialib.calls.adminImageFolderCreate.init(folderName,{},'immutable');
				app.ext.admin_medialib.u.resetAndGetMediaFolders('immutable'); //will empty list and create dispatch.
				app.model.dispatchThis('immutable');
				}
			else	{
				app.u.throwMessage("please enter a folder name");
				$('#mediaLibNewFolderName').focus();
				}
	
			})
		}
	else if($button.data('btn-action') == 'selectAddFolderDestination')	{
		$button.button({text:false, icons: {primary: "ui-icon-triangle-1-s"}}).click(function(event){
		
			event.preventDefault(); //keeps button from submitting the form.
var menu = $(this).parent().find('ul').toggle().css({position:'absolute','z-index':'1000'}).position({
	my: "right top",
	at: "right bottom",
	of: this
	});
			})
		}
	});
//groups any buttons inside a span as a button set. this is specifically for the add folder feature.
$('#mediaLibActionsBar span',$target).buttonset();
//makes any ul's inside the spans a menu. THey'll appear on click as part of the btn-action code. used, but not limited to, for selectAddFolderDestination
$('#mediaLibActionsBar span ul',$target).hide().menu().selectable();
				}, //handleMediaLibButtons
			
			
			showPublicFiles : function(path,P){
				var $target = $('#setupContent');
				$target.empty().append(app.renderFunctions.transmogrify({},'page-setup-publicfiles',{})); //load the page template.
				app.ext.admin_medialib.u.convertFormToJQFU('#publicFilesUploadForm','publicFileUpload');
				app.ext.admin_medialib.calls.adminPublicFileList.init({'callback':'handlePublicFilesList','extension':'admin_medialib'});
				app.model.dispatchThis();
				},
			
			
			showFileUploadPage : function(path,P)	{

var tabs = [
	{"link":"/biz/setup/import/index.cgi/index.cgi?VERB=","name":"HELP","selected":0},
	{"link":"/biz/setup/import/index.cgi/index.cgi?VERB=PRODUCTS","name":"Products","selected":0},
	{"link":"/biz/setup/import/index.cgi/index.cgi?VERB=INVENTORY","name":"Inventory","selected":0},
	{"link":"/biz/setup/import/index.cgi/index.cgi?VERB=CUSTOMERS","name":"Customers","selected":0},
	{"link":"/biz/setup/import/index.cgi/index.cgi?VERB=REVIEWS","name":"Reviews","selected":0},
	{"link":"/biz/setup/import/index.cgi/index.cgi?VERB=NAVCATS","name":"Categories","selected":0},
	{"link":"/biz/setup/import/index.cgi/index.cgi?VERB=REWRITES","name":"URL Rewrites","selected":0},
	{"link":"/biz/setup/import/index.cgi/index.cgi?VERB=ORDERS","name":"Orders","selected":0},
	{"link":"/biz/setup/import/index.cgi/index.cgi?VERB=TRACKING","name":"Tracking","selected":0},
	{"link":"/biz/setup/import/index.cgi/index.cgi?VERB=RULES","name":"Rules","selected":0},
	{"link":"/biz/setup/import/index.cgi/index.cgi?VERB=LISTINGS","name":"Listings","selected":0},
	{"link":"/biz/setup/import/index.cgi/index.cgi?VERB=IMAGES","name":"Images","selected":0},
	{"link":"/biz/setup/import/index.cgi/index.cgi?VERB=OTHER","name":"Other","selected":0}
	]

//				app.u.dump("BEGIN admin_medialib.u.showFileUploadPage");
				var $target = $('#setupContent')
				pathParams = app.u.getParametersAsObject(path.split('?')[1]);
				if(!pathParams.VERB)(pathParams.VERB = "HELP"); //default to showing the help page.
//				app.u.dump(" -> pathParams: "); app.u.dump(pathParams);
				$target.empty().append(app.renderFunctions.transmogrify({},'page-setup-import-'+pathParams.VERB.toLowerCase(),{})); //load the page template.
				app.ext.admin_medialib.u.convertFormToJQFU('#csvUploadToBatchForm','csvUploadToBatch');
				app.ext.admin.u.uiHandleNavTabs(tabs);
				}
			
			} //u


		
		} //r object.
	return r;
	}