/*
 * Autor：Jabo
 * Time:2017/04/26
 * Desc:亿策在线教育逻辑
 */
$(function(){
	/*
	 * 导航部分
	 */
	$(".jToggleSearch").on("click", function(){
		var $dycsearch = $("#dycsearch")
		if($dycsearch.hasClass("active")){
			if($dycsearch.val() == ""){
				$dycsearch.removeClass("active");
			} else {
				/**API search information**/
			}
		} else {
			$dycsearch.addClass("active");
		}
	})
	
	
	
	
})
