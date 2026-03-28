
package edu.infosysLostFoundLocatorApplication.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.infosysLostFoundLocatorApplication.bean.MatchItem;
import edu.infosysLostFoundLocatorApplication.bean.MatchItemId;

@Repository
public class MatchItemDaoImpl implements MatchItemDao {

    @Autowired
    private MatchItemRepository matchItemRepository;

    // Save Match Item
    @Override
    public void saveMatchItem(MatchItem matchItem) {
        matchItemRepository.save(matchItem);
    }

    // Get All Match Items
    @Override
    public List<MatchItem> getAllMatchItems() {
        return matchItemRepository.findAll();
    }

    // Get Match Item By ID
   // @Override
    //public MatchItem getMatchItemById(MatchItemId matchItemId) {
       // return matchItemRepository.findById(matchItemId).orElse(null);
    //}

    // Delete Match Item
   // @Override
    //public void deleteMatchItemById(MatchItemId matchItemId) {
        //matchItemRepository.deleteById(matchItemId);
   }

