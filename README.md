# TON Payment Channel Crowdfunding
Created by Nutcrackers on **TON Contest** 2022

## Main idea
Investor and Worker connects by *Payment Channel* to perform costless transfers during cooperation. 
Because of it Investor has better control on his funds&: Worker provide count estimate list every week or less and Investor can agree or disagree with poits in this list.
Also it fix problem of trust, Worker will always get paid for his work, while Investor will pay only for result.All disputes can be resolved by *Uncooperative close*

## Prototip description
On main page of our crowdfunding website you can deploy Payment Channel contract (it describes that Investor and Worker start cooperative) and close it (it stands for end of cooperation)
In real cause site would have some auth and search systems, but our project is about payments inside TON, that's why we step over it.
To deploy u need to set a budget. After deployment u need to wait some time (for all transactions get registered in blockchain) and u can finally go to Investor's and Worker's page.
It might look strange in context of 2 fixed wallets, but now imagine that it a multi thousand platform, where tons of people on one hand want to invest their money and on other no less want earn it.
Payment Chanells make host of this project a lot easier. If investor start cooperate his money already inside smart contract, and worker wouldnt stay with empty hand. And how was said above Uncommited Closes also helps to manage controversial situation.

### Worker's page
This page represents how website might look for worker. There is chat and list of tables. 
Worker fills tables with tasks and their costs, after that sends it to Investor. He can also talk to him with chat (where they discuss about payment for each task). In real case it may have some fields for sending proofs, like images or other files.

### Investor's page
At opposite side we have page where Investor can see tables from Worker, approve or not concrete points, send messages to Worker and pay to him.
When Investor approve some points of estimate count, its costs automatically adds to total bill. (All buttons that provides operation with wallets have a confirm checkbox)
After Investor clicks pay he signed a new Payment Channel state with redistributed balances.


