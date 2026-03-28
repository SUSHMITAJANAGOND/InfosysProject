package edu.infosysLostFoundLocatorApplication.dao;

import java.util.List;

import edu.infosysLostFoundLocatorApplication.bean.MatchItem;
import edu.infosysLostFoundLocatorApplication.bean.MatchItemId;

public interface MatchItemDao {

	// Save Match Item
    public void saveMatchItem(MatchItem matchItem);

    // Get All Match Items
    public List<MatchItem> getAllMatchItems();

    // Get Match Item By ID
    //public MatchItem getMatchItemById(MatchItemId matchItemId);

    // Delete Match Item
    //public void deleteMatchItemById(MatchItemId matchItemId);

    // Get Match Items by Lost Username
    //public List<MatchItem> getMatchItemsByLostUsername(String username);

    // Get Match Items by Found Username
    //public List<MatchItem> getMatchItemsByFoundUsername(String username);
    
    //List<MatchItem> getMatchItemsByLostItemId(String lostItemId);


}