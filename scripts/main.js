(() => {
	(window . addEventListener)('DOMContentLoaded' , async (event) => {
		const contentContainer = (document . getElementById)('swoope-content');
		const makeErrorContent = (message) => {
			const fragment = (document . createDocumentFragment)();
			const p = (document . createElement)('p');
			const strong = (document . createElement)('strong');
			const text = (document . createTextNode)(message);
			(strong . appendChild)(text);
			(p . appendChild)(strong);
			(fragment . appendChild)(p);
			return(fragment);};
		const clearContent = async () => {
			(window . requestAnimationFrame)(() => {
				if(contentContainer . lastChild){
					(contentContainer . removeChild)(
						contentContainer . lastChild);};});};
		const displayContent = async (content) => {
			(window . requestAnimationFrame)(() => {
				if(contentContainer . lastChild){
					(contentContainer . replaceChild)(
						content , contentContainer . lastChild);}
				else{
					(contentContainer . appendChild)(content);};});};
		const fetchContent = async (path , containerElementTag) => {
			const response = await(fetch(path));
			if(!(response . ok)){
				throw(Error('' + response . status + ': ' + response . statusText));};
			const fragment = (document . createDocumentFragment)();
			const content = (document . createElement)(containerElementTag);
			content . innerHTML = await((response . text)());
			(fragment . appendChild)(content);
			return(fragment);};
		const updateContent = async (path , containerElementTag) => {
			scrollTo(0 , 0);
			await(clearContent());
			let content = null;
			try{
				content = await(fetchContent(path , containerElementTag));}
			catch(error){
				content = makeErrorContent(error . message);};
			await(displayContent(content));};
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
