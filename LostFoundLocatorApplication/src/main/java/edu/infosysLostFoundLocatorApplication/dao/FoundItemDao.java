package edu.infosysLostFoundLocatorApplication.dao;

import java.util.List;

import edu.infosysLostFoundLocatorApplication.bean.FoundItem;

public interface FoundItemDao {
	public void saveFoundItem(FoundItem foundItem);
	public List<FoundItem> getAllFoundItems();
	public FoundItem getFoundItemById(String foundItemId);
	public void deleteFoundItemById(String foundItemId);
	
	public String getLastId();
	public List<FoundItem> getFoundItemsByUsername(String username);
	public List<FoundItem> searchByKeyword(String keyword);

	public List<FoundItem> fuzzySearchBySoundex(String keyword);
}
