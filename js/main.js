document.querySelector('#get-cocktail').addEventListener('click', getFetch)
function getFetch() {
	const choice = document.querySelector('#input-cocktail').value
	// regex replaces one or more consecutive white spaces by one space
	const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='+choice.replace(/\s+/, ' ')
	fetch(url)
		.then(res => res.json()) // parse response as JSON
		.then(data => {

			const owlcarousel = document.querySelector('.owl-carousel');
			owlcarousel.innerHTML = '';
			
			for (drink of data.drinks) {
				let ingredients = document.createElement('ul');
				//max 15 ingredients
				for (let i = 1; i <= 15; i += 1) {
					if (drink['strIngredient' + i]) {
						let li = document.createElement('li');
						li.innerText = `${drink['strIngredient' + i]} : ${drink['strMeasure' + i] || ''}`;
						ingredients.appendChild(li);
					}
				}

				let html = `
				<div class="item">
					<div class="work-wrap d-md-flex">
						<div class="img" style="background-image: url('${drink['strDrinkThumb']}'); background-size:contain;"></div>
						<div class="text text-left text-lg-left p-4 px-xl-5 d-flex align-items-center">
							<div class="py-md-5">
								<h2 class="mb-4">${drink['strDrink']}</h2>
								<p class="h5">${drink['strAlcoholic']}</p>
								<p class="h5 mb-4">Category: ${drink['strCategory']}</p>
								<div class="row justify-content-start">
									${ingredients.outerHTML}
									<div class="col-xl-8">
										<p>${drink['strInstructions']}</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				`
				owlcarousel.insertAdjacentHTML('beforeend', html);
			}
			
			$('.featured-carousel').owlCarousel('destroy');
			carousel()

		})
		.catch(err => {
			console.log(`error ${err}`)
		});
}



var fullHeight = function() {

	$('.js-fullheight').css('height', $(window).height());
	$(window).resize(function(){
		$('.js-fullheight').css('height', $(window).height());
	});

};
fullHeight();

let carousel = function() {
	$('.featured-carousel').owlCarousel({
		loop:true,
		autoplay: false,
		margin:30,
		animateOut: 'fadeOut',
		animateIn: 'fadeIn',
		nav:true,
		dots: true,
		autoplayHoverPause: false,
		items: 1,
		navText : [
			"<p><small>Prev</small><span class='ion-ios-arrow-round-back'></span></p>",
			"<p><small>Next</small><span class='ion-ios-arrow-round-forward'></span></p>"
		],
		responsive:{
			0: {
				items:1
			},
			600: {
				items:1
			},
			1000:{
				items:1
			}
		}
	});

};
carousel();
