// ==UserScript==
// @name          Arras.io Modified Client
// @namespace     https://tampermonkey.net/
// @version       1.0.0
// @description   Force the use of AMC(Arras.io Modified client)
// @license       MIT
// @icon          https://arras.io/favicon/128x128.png
// @author        PonyoLab
// @match         *://arras.io/*
// @grant         GM_info
// @run-at        document-start
// ==/UserScript==
 
(async () => {
 
	// 変数宣言
	const SCRIPT = {
		...GM_info.script,
		"name": "AMC"
	};
 
	// ページの変更
	async function modifyPage() {
		console.log(`[${SCRIPT.name}]`, "Modifying page...");
		const response = await fetch("https://arras.io");
		const html = (await response.text())
			.replace(/<script src=\"\/bundle.js?.*\"><\/script>/, "");
		document.open();
		document.write(html);
		document.close();
	}
 
	// クライアントコードの注入
	async function injectClient() {
		console.log(`[${SCRIPT.name}]`, "Injecting client code...");
		const response = await fetch("https://raw.githubusercontent.com/CantRunRiver/Arras-Patched/main/bundle_patched.js");
		const js = await response.text();
		return new Function(js)();
	}
 
	// 実行
	await modifyPage();
	await injectClient();
	console.log(`[${SCRIPT.name}]`, "Succeeded!");
 
})();
