# git-commits

Fetches the 100 most recent commits from a GitHub repo (GitHub API limit), filters out any dependency updates (Dependabot, Greenkeeper, and Renovate),
and attempts to filter out any GitHub pull request merges, and any Poontoon commits.

## USAGE:

```sh
$ npx pdehaan/git-commits {owner} {repo}
```

## OUTPUT:

```sh
$ npx pdehaan/git-commits mozilla send

 4/11/2019  Danny Coates              added overflow-hidden to file input element. fixes #1295                            
 4/11/2019  Danny Coates              updated deps                                                                        
 4/11/2019  Danny Coates              removed old encryption key implementation                                           
 4/5/2019   Donovan Preston           Fix #1283 Prevent loading any pages other than our file:/// url resources and ac... 
 4/4/2019   Christoph Kührer          Cleanup Android project (Minor refactorings, etc.) (#1244) * (Android) Get rid o... 
 4/4/2019   Donovan Preston           Call setTranslate on android.                                                       
 3/31/2019  Danny Coates              fixed L10N_DEV option                                                               
 3/31/2019  Danny Coates              updated deps                                                                        
 3/31/2019  Danny Coates              added gravatar to CSP image-src                                                     
 3/31/2019  Danny Coates              fixed dev android for longer file ids                                               
 3/29/2019  Mozilla-GitHub-Standards  Add Mozilla Code of Conduct file Fixes #1286. _(Message COC002)_                    
 3/26/2019  Danny Coates              v3.0.9                                                                              
 3/26/2019  Danny Coates              fixed isFile for extended file id size                                              
 3/26/2019  Danny Coates              updated prod locales                                                                
 3/26/2019  Danny Coates              increase file id to 8 bytes                                                         
 3/21/2019  Danny Coates              fixed fxa entrypoint param name... 🤦‍♂️                                               
 3/18/2019  Danny Coates              v3.0.8                                                                              
 3/18/2019  Danny Coates              updated CONTRIBUTORS                                                                
 3/18/2019  Danny Coates              added locales to production                                                         
 3/18/2019  Danny Coates              added entrypoint param to fxa auth request                                          
 3/18/2019  Danny Coates              updated webcrypto-liner                                                             
 3/17/2019  Danny Coates              changed webpack output filenames to use contenthash                                 
 3/16/2019  Danny Coates              fixed incorrect uncompressed size in zip                                            

23 / 100
```

**NOTE:** The summary at the bottom of the output (ie: "23 / 100"), shows how many of the commits (23) were unfiltered out of the last 100 commits.
