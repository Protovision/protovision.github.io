(() => {
	(window . addEventListener)('DOMContentLoaded' , async (event) => {
		const title = (document . getElementById)('swoope-title');
		const headerContainer = (document . getElementById)('swoope-header');
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
			/*(window . requestAnimationFrame)(() => {*/
				scrollTo(0 , 0);
				if(contentContainer . lastChild){
					(contentContainer . removeChild)(
						contentContainer . lastChild);};/*});*/};
		const displayContent = async (content , hash) => {
			/*(window . requestAnimationFrame)(() => {*/
				if(contentContainer . lastChild){
					(contentContainer . replaceChild)(
						content , contentContainer . lastChild);}
				else{
					(contentContainer . appendChild)(content);};
				if(hash){
					((document . getElementById)(hash) . 
						scrollIntoView)();};/*});*/};
		const fetchContent = async (path) => {
			const response = await(fetch(path));
			if(!(response . ok)){
				throw(Error(
					'Error ' + response . status + ': ' + response . statusText));};
			const fragment = (document . createDocumentFragment)();
			const content = (document . createElement)('article');
			content . innerHTML = await((response . text)());
			(fragment . appendChild)(content);
			return(fragment);};
		const updateContent = async (url) => {
			const hash = (
				(url . pathname == '/' || url . pathname == '/index.html') && 
				(!(url . hash) || url . hash == '#')) ?
					'#/documents/index.html' : url . hash;
			const realFragmentIndex = (hash . lastIndexOf)(':');
			const realPath = (hash . substring)(1 , 
				realFragmentIndex != -1 ? realFragmentIndex : hash . length);
			const realFragment = realFragmentIndex != -1 ? 
				(hash . substring)(realFragmentIndex + 1) : null;
			let content = null;
			try{
				[, content] = await((Promise . all)([
					clearContent() , fetchContent(realPath)]));}
			catch(error){
				content = makeErrorContent(error . message);};
			await(displayContent(content , realFragment));};
		window . addEventListener('hashchange' , (event) => {
			updateContent(new URL(event . newURL));});
		updateContent(new URL(window . location));})})();

