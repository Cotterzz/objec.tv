var data = { "nodes": [{"title":"COMPUTER SCIENCE","type":"none","x":3.4394972020781456,"y":2.3393374526309145,"z":3,"nodes":[{"title":"HARDWARE","type":"none","x":-5.501745812048753,"y":-22.588837992626168,"z":3,"nodes":[{"title":"Raspberry Pi","type":"none","x":-8.88349112596918,"y":-6.7439308734142145,"z":3,"nodes":[]},{"title":"Arduino","type":"none","x":4.648696289362519,"y":-7.298400210613412,"z":3,"nodes":[]},]},{"title":"SOFTWARE","type":"none","x":-25.078561262127984,"y":-6.5816135635803334,"z":3,"nodes":[{"title":"OPERATING SYSTEMS","type":"none","x":-2.3296231083661283,"y":-11.826580875705286,"z":3,"nodes":[{"title":"Windows","type":"none","x":-13.782754553864663,"y":7.731239764398794,"z":3,"nodes":[]},{"title":"Android","type":"none","x":-18.075364181562584,"y":-9.215442747331469,"z":3,"nodes":[]},{"title":"Linux","type":"none","x":0.23554788062190823,"y":-6.684652011482195,"z":3,"nodes":[{"title":"Kali","type":"none","x":-7.56877845199115,"y":-8.218183497964244,"z":3,"nodes":[]},{"title":"Raspbian","type":"none","x":1.17356812160536,"y":-4.929175284457626,"z":3,"nodes":[]},{"title":"Ubuntu","type":"none","x":-10.886637543138619,"y":-3.9834735351699955,"z":3,"nodes":[]},]},{"title":"ROS","type":"none","x":-23.420425700368682,"y":-6.399973657903985,"z":3,"nodes":[]},{"title":"iOS","type":"none","x":-22.293076453635273,"y":3.5636929782132825,"z":3,"nodes":[]},{"title":"OSX","type":"none","x":-23.674931593493966,"y":-0.6381191574962237,"z":3,"nodes":[]},]},]},{"title":"LANGUAGES","type":"none","x":-6.402229204066952,"y":10.537621855852542,"z":3,"nodes":[{"title":"Web","type":"none","x":-4.99594570903351,"y":7.01362966527476,"z":3,"nodes":[{"title":"Client","type":"none","x":9.02322971634599,"y":9.688328149463704,"z":3,"nodes":[{"title":"HTML","type":"none","x":-14.174959075465736,"y":-13.136972744375974,"z":3,"nodes":[]},{"title":"CSS","type":"none","x":-16.65318345516739,"y":-8.695453835399746,"z":3,"nodes":[]},{"title":"JavaScript","type":"none","x":-28.720028381545347,"y":-2.073315476341776,"z":3,"nodes":[{"title":"JSON","type":"none","x":-7.029500367325255,"y":-4.742984979967623,"z":3,"nodes":[]},{"title":"Angular","type":"none","x":-8.829805106419599,"y":5.351148729673298,"z":3,"nodes":[]},{"title":"React","type":"none","x":-11.164299856439925,"y":1.4318903619027346,"z":3,"nodes":[]},{"title":"D3.js","type":"none","x":-7.053679175246444,"y":8.375802144249796,"z":3,"nodes":[]},{"title":"WebAssembly","type":"none","x":-10.917397430666838,"y":-1.4864035925800394,"z":3,"nodes":[]},{"title":"Three.js","type":"none","x":2.438085802361776,"y":6.726106833417351,"z":3,"nodes":[]},]},{"title":"WebGL","type":"none","x":-14.476362929378872,"y":6.875475957779074,"z":3,"nodes":[{"title":"GLSL","type":"none","x":-7.133237417564125,"y":3.7237590246741643,"z":3,"nodes":[]},]},]},{"title":"Server","type":"none","x":-10.405433793048346,"y":-11.949729867142166,"z":3,"nodes":[{"title":"Node.js","type":"none","x":-3.562604629386229,"y":16.27766018937084,"z":3,"nodes":[]},{"title":"PHP","type":"none","x":-10.957723486383646,"y":5.916757106224022,"z":3,"nodes":[]},{"title":"ASP.Net","type":"none","x":-11.240249184800277,"y":-0.8287432210854835,"z":3,"nodes":[{"title":"CSharp","type":"none","x":-7.965345981333094,"y":-2.3877724682895245,"z":3,"nodes":[]},{"title":"Visual Basic","type":"none","x":-10.257026429624034,"y":0.9853055881753079,"z":3,"nodes":[]},]},{"title":"Python","type":"none","x":-8.642998269431033,"y":9.183330822423644,"z":3,"nodes":[]},{"title":"Java","type":"none","x":-12.41722287828393,"y":2.3635838032531726,"z":3,"nodes":[]},]},]},]},{"title":"AI","type":"none","x":20.394770965190006,"y":19.692313109546877,"z":3,"nodes":[{"title":"Neural Networks","type":"none","x":17.25491188137225,"y":-3.619871912830142,"z":3,"nodes":[]},{"title":"Machine Learning","type":"none","x":17.173332957586393,"y":-9.351068494485595,"z":3,"nodes":[]},{"title":"Generalised","type":"none","x":14.030436413695615,"y":1.560146277317088,"z":3,"nodes":[]},{"title":"Singularity","type":"none","x":10.058776808004303,"y":6.179157422425874,"z":3,"nodes":[]},]},{"title":"GAMES","type":"none","x":12.7254540347013,"y":-12.052785616272757,"z":3,"nodes":[{"title":"Gamification","type":"none","x":23.78674670475943,"y":-7.525179258944444,"z":3,"nodes":[]},{"title":"Game Design","type":"none","x":21.451681070254445,"y":-13.61226087844635,"z":3,"nodes":[]},{"title":"Game Development","type":"none","x":22.604720335768825,"y":-1.793966544608164,"z":3,"nodes":[]},]},]},],"joins": [
    {"title": "none","nodeA": "COMPUTER SCIENCE.LANGUAGES.Web.Client.JavaScript.Three.js","nodeB": "COMPUTER SCIENCE.LANGUAGES.Web.Client.WebGL","thickness": 0.5},
    {"title": "none","nodeA": "COMPUTER SCIENCE.HARDWARE.Raspberry Pi","nodeB": "COMPUTER SCIENCE.SOFTWARE.OPERATING SYSTEMS.Linux.Raspbian","thickness": 0.5},
    {"title": "none","nodeA": "COMPUTER SCIENCE.LANGUAGES.Web.Client.JavaScript","nodeB": "COMPUTER SCIENCE.LANGUAGES.Web.Server.Node.js","thickness": 0.5}
  ]
}
/*


var data = { "nodes": [
						{"title":"Ford 3D Player POC","type":"none","x":3.4,"y":2.3,"z":3,"nodes":[
								{"title":"index.html","type":"none","x":3.4,"y":2.3,"z":3,"nodes":[
									{"title":"index.js","type":"none","x":3.4,"y":2.3,"z":3,"nodes":[
										{"title":"Shout.js","type":"none","x":3.4,"y":2.3,"z":3,"nodes":[]},
										{"title":"App.js","type":"none","x":3.4,"y":2.3,"z":3,"nodes":[
											{"title":"Viewport.js","type":"none","x":3.4,"y":2.3,"z":3,"nodes":[
												{"title":"Three.js","type":"none","x":3.4,"y":2.3,"z":3,"nodes":[]},
												{"title":"OrbitControls.js","type":"none","x":3.4,"y":2.3,"z":3,"nodes":[]}
											]},
											{"title":"Partloader.js","type":"none","x":3.4,"y":2.3,"z":3,"nodes":[
												{"title":"data.json","type":"none","x":3.4,"y":2.3,"z":3,"nodes":[]},
												{"title":"WheelBadge.js","type":"none","x":3.4,"y":2.3,"z":3,"nodes":[]},
												{"title":"BadgeBump.jpg","type":"none","x":3.4,"y":2.3,"z":3,"nodes":[]}
											]}
										]}
									]},
									{"title":"css.css","type":"none","x":3.4,"y":2.3,"z":3,"nodes":[]}
								]}
						]}
					  ],
			 "joins": [

					  ]
}
*/
/*
var data = { "nodes": [{"title":"Ford 3D Player POC","type":"none","x":-4.252164020676348,"y":17.361953622089278,"z":3,"nodes":[{"title":"index.html","type":"none","x":-2.169267272694764,"y":-8.258703966907952,"z":3,"nodes":[{"title":"index.js","type":"none","x":1.368988717776075,"y":-7.464333479185783,"z":3,"nodes":[{"title":"Shout.js","type":"none","x":9.062739558120244,"y":-0.5122105541313253,"z":3,"nodes":[]},{"title":"App.js","type":"none","x":0.5921273180184774,"y":-5.785692716433433,"z":3,"nodes":[{"title":"Viewport.js","type":"none","x":0.36570967857575365,"y":-5.672421325127183,"z":3,"nodes":[{"title":"Three.js","type":"none","x":1.0726945076577072,"y":-6.304470245462533,"z":3,"nodes":[]},{"title":"OrbitControls.js","type":"none","x":11.357018134893886,"y":-4.186179601454016,"z":3,"nodes":[]},]},{"title":"Partloader.js","type":"none","x":11.347687081228553,"y":-0.9462865239953251,"z":3,"nodes":[{"title":"data.json","type":"none","x":13.446082881109573,"y":-6.640062876887657,"z":3,"nodes":[]},{"title":"WheelBadge.js","type":"none","x":14.460989844920354,"y":-0.15501923340354118,"z":3,"nodes":[]},{"title":"BadgeBump.jpg","type":"none","x":14.7192395136615,"y":-2.994202338464892,"z":3,"nodes":[]},]},]},]},{"title":"css.css","type":"none","x":13.632739852012623,"y":-1.9954006052640336,"z":3,"nodes":[]},]},]},],"joins": []}
*/
