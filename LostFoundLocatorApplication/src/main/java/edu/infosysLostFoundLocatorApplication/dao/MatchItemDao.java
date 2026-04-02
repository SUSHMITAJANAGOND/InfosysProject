package edu.infosysLostFoundLocatorApplication.dao;
import edu.infosysLostFoundLocatorApplication.bean.MatchItem;
import edu.infosysLostFoundLocatorApplication.bean.MatchItemId;
import java.util.List;


public interface MatchItemDao {
	
	 public MatchItem saveMatchItem(MatchItem matchItem);
	// public MatchItem getMatchItemById(MatchItemId matchItemId);
	 public List<MatchItem> getAllMatchItems();
	// public void deleteMatchItem(MatchItemId matchItemId);
	
	
}
