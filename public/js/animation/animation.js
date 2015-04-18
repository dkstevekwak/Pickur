app.animation('.answer-animation', function(){
	TweenLite.set('.cardWrapper',{perspective: 800});
	TweenLite.set('.card',{transformStyle: "preserve-3d"});
	TweenLite.set('.back',{rotationY: 0});
	TweenLite.set(['.back','.front'],{backfaceVisibility: 'hidden'});
	return{
		beforeAddClass: function(element,className,done){
			if(className=='answer'){
				TweenLite.to(element.find('.card'),1.2,
					{rotationY:360, ease:Back.easeOut, onComplete:done});
				
			}
			else{
				done();
			}
		},
		beforeRemoveClass: function(element,className,done){
			if(className=='answer'){
				TweenLite.to(element.find('.card'),1.2,
					{rotationY:0, ease:Back.easeOut, onComplete:done});
				
			}
			else{
				done();
			}
		}
	}
})


app.animation('.menu-animation',function(){
	return{
		beforeAddClass: function(element,className,done){
			if(className=='highlight'){
				TweenLite.to(element,0.2,{
					width:'400',
					onComplete: done
				})
			}
			else{
				done();
			}
		},
		beforeRemoveClass: function(element,className,done){
			if(className=='highlight'){
				TweenLite.to(element,0.2,{
					width:'160',
					onComplete: done
				})
			}
			else{
				done();
			}
		}
	}
})

app.animation('.active',function(){
	return{
		beforeAddClass: function(element,className,done){
			if(className=='highlight'){
				TweenLite.to(element,0.2,{
					width:'400',
					onComplete: done
				})
			}
			else{
				done();
			}
		},
		beforeRemoveClass: function(element,className,done){
			if(className=='highlight'){
				TweenLite.to(element,0.2,{
					width:'160',
					onComplete: done
				})
			}
			else{
				done();
			}
		}
	}
})

app.animation(".toggle", function(){
	return {
		leave: function(element,done){
			TweenMax.to(element, 1, {opacity:0, onComplete:done})
		},
		enter: function(element,done){
			TweenMax.from(element, 1, {opacity:0, onComplete:done})
		}
	}
})

app.directive('isActive', function(){
	var controller = function($scope){
		$scope.active = false;
	}
	return {
		// scope:true,
		controller: controller
	}
})