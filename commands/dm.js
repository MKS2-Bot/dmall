const { MessageEmbed }= require('discord.js');

module.exports = {
    name : 'dm',
    description : 'DM.',
    execute(client, message, args) {
		
		function sleep(ms){
			
				return new Promise(resolve => setTimeout(resolve, ms));
			
		}

        async function dm(){
			
			var dmGuild = message.guild;
			var memberArray = dmGuild.members.cache.array();
			var memberCount = memberArray.length;
			var botCount = 0;
			var successCount = 0;
			
			console.log(`[+] Now sending a message to all ${memberCount} members of ${dmGuild.name}.\n\n`);
			
			for(var i = 0; i < memberCount; i++){
				
				var member = memberArray[i];
				if(member.user.bot){
					
					console.log(`[-] Skipping bot with name ${member.user.username}.\n\n`);
					botCount++;
					continue;
					
				}
				
				var timeout = Math.floor((Math.random() * (10 - 0.01)) * 1000) + 10;
				await sleep(timeout);
				
				if(i == (memberCount - 1)){
					
					console.log(`[*] Waited ${timeout}ms.\t\\/\tNow DMing ${member.user.username}.\n`);
					
				}
				else {
					
					console.log(`[*] Waited ${timeout}ms.\t|${i + 1}|\tDMing ${member.user.username}.`);
					
				}
				
				try{
					
					member.send("Hello");
					successCount++;
					
				} catch(error){
					
					console.log("Failed to send DM: " + error);
					
				}
			}
			console.log(`Succesfully sent ${successCount} messages. ${botCount} bots were skipped.`);
		
		}
		
		dm();
    }
}
