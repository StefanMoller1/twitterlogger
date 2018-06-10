function read(files){
    var final = {}
    files.forEach(function(file) {
        if (file){
            Reader(file).then(seq => {
                if (file.name.includes('user')){
                    final["users"] = prepUsers(seq);
                }
                else if (file.name.includes('tweet')){
                    final["tweets"] = prepFeed(seq);
                }
                return final;
            }).then(e => {
                if (final.users && final.tweets){
                    logData(final)
                }
            });
        }
    })
}

//###############################################################
//HELPER FUNCTIONS TO CLEAR UP AND PARSE THE INPUT FILES
//###############################################################

function Reader(file){
    return new Promise(function(resolve, reject){
        let reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function (evt) {
            let result = evt.target.result.split('\n').filter(line => line.length !== 0);
            try{
                resolve(result);
            }
            catch(error){
                reject(Error(reader));
            }
        }
        reader.onerror = function (evt) {
            document.getElementById("warningMessage").innerHTML = "error reading " + file.name + " file";
        }
    });
}

function prepUsers(item){
    let users = {};
    item.forEach(e => {
        let value = e.split(' follows ');
        if(value && value.length !== 1){
            users[value[0].trim()] = [value[0], ...value[1].split(', ').map(e => e.trim())];
        }
    });
    return JSON.stringify(users);
}

function prepFeed(item){
    let feed = [];
    item.forEach(e => {
        let value = e.split('> ');
        if(value && value.length !== 1){
            feed.push([value[0].trim(), value[1].trim()]);
        }
    })
    return JSON.stringify(feed);
}

function logData(final){
    final.users = JSON.parse(final.users)
    final.tweets = JSON.parse(final.tweets)

    var users = Object.keys(final.users);
    
    users.map(e => users = [...users, ...final.users[e]]);
    users = [...new Set(users)].sort();
    users.forEach(user =>{
        console.log(user);
        if(final.users[user]){
            let follows = final.users[user];
            final.tweets.forEach(e => {
                if(follows.includes(e[0])){
                    console.log(`@${e[0]}: ${e[1]}`);
                }
            });
        }
    });
}

module.exports = {read, Reader, prepUsers, prepFeed, logData};