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

var _store_formals = function() {
	var r= {
		vars : {
			catTemplates : {
				
			},
		},
		
		callbacks : {
			init : {
				onSuccess : function(){
					app.u.dump('BEGIN app.ext_store_formals.callbacks.init.onSuccess');
				},
				onError : function() {
					app.u.dump('BEGIN app.ext_store_formals.callbacks.init.onError');
				}
			},
			startExtension : {
				onSuccess : function (){
					app.u.dump('BEGIN app.ext_store_formals.callbacks.startExtension.onSuccess')
				},
				onError : function (){
					app.u.dump('BEGIN app_store_formals.callbacks.startExtension.onError');
				}
			},
		},
		
		
		////////////////////////////////////   ACTION    \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

//actions are functions triggered by a user interaction, such as a click/tap.
//these are going the way of the do do, in favor of app events. new extensions should have few (if any) actions.
		a : {
			//HEADER DROPDOWN MENUS
				showDropdown : function($tag) {
					var $dropdown = $(".dropdown", $tag);
					var height = 300;
					/*$dropdown.children().each(function(){
						height += $(this).outerHeight(true);
					});*/
					$dropdown.stop().animate({"height":height+"px"}, 500);
				},
					
				hideDropdown : function($tag) {
					$(".dropdown", $tag).stop().animate({"height":"0px"}, 500);
				}
			//END HEADER DROPDOWN MENUS
			
		},//END a FUNCTIONS
		
		renderFormats : {
			//Identical to the showIFSet render format but sets to inline instead of block.
			showIfSetInline : function($tag,data)	{
			if(data.value)	{
				$tag.show().css('display','inline'); //IE isn't responding to the 'show', so the display:inline is added as well.
				}
			},
		}
	}
	return r;
}