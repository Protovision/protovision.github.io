(() => {
	(window . addEventListener)('DOMContentLoaded' , async (event) => {
		const content = (document . getElementById)('swoope-content');
		const makeErrorFragment = (message) => {
			const fragment = (document . createDocumentFragment)();
			const p = (document . createElement)('p');
			const strong = (document . createElement)('strong');
			const text = (document . createTextNode)(message);
			(strong . appendChild)(text);
			(p . appendChild)(strong);
			(fragment . appendChild)(p);
			return(fragment);};
		const eraseContent = async () => {
			(window . requestAnimationFrame)(() => {
				if(content . lastChild){
					(content . removeChild)(content . lastChild);};});};
		const writeContent = async (fragment) => {
			(window . requestAnimationFrame)(() => {
				if(content . lastChild){
					(content . replaceChild)(fragment , content . lastChild);}
				else{
					(content . appendChild)(fragment);};});};
		const fetchFragment = async (path , containerElementTag) => {
			const response = await(fetch(path));
			if(!(response . ok)){
				throw(response . statusText);};
			const fragment = (document . createDocumentFragment)();
			const container = (document . createElement)(containerElementTag);
			container . innerHTML = await((response . text)());
			(fragment . appendChild)(container);
			return(fragment);};
		const updateContent = async (path , containerElementTag) => {
			scrollTo(0 , 0);
			await(eraseContent());
			let fragment = null;
			try{
				fragment = await(fetchFragment(path , containerElementTag));}
			catch(error){
				fragment = makeErrorFragment(error);};
			await(writeContent(fragment));};
		const refresh = async () => {
			if(location . hash . length > 2){
				const path = 'documents/' + ((location . hash . substr)(1)) + '.html';
				await(updateContent(path , 'article'));}
			else{
				await(updateContent('documents/index.html' , 'article'));};};
		(document . getElementById('swoope-title') . addEventListener)(
			'click' ,
			async () => {
				if(location . hash != ''){
					location . hash = '';}
				else{
					await(updateContent('documents/index.html' , 'article'));};});
		(window . addEventListener)(
			'hashchange' ,
			async (ev) => {
				(ev . preventDefault)();
				(ev . stopPropagation)();
				await(refresh());} , true);
		await(refresh());});})();
