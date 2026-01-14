/**
 * Quick Actions Service Unit Tests
 *
 * Tests for iOS 3D Touch and Android long-press shortcuts functionality
 */

import * as QuickActions from 'expo-quick-actions';
import { router } from 'expo-router';
import {
  initializeQuickActions,
  handleQuickAction,
  getInitialQuickAction,
  subscribeToQuickActions,
  QUICK_ACTIONS,
  QuickActionType,
} from './index';

// Mock expo-router
jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
  },
  Href: {},
}));

// Mock expo-quick-actions
jest.mock('expo-quick-actions');

const mockQuickActions = QuickActions as jest.Mocked<typeof QuickActions> & {
  __setInitial: (action: QuickActions.Action | undefined) => void;
  __getItems: () => QuickActions.Action[];
  __triggerAction: (action: QuickActions.Action) => void;
  __reset: () => void;
};

describe('Quick Actions Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockQuickActions.__reset?.();
  });

  describe('QUICK_ACTIONS', () => {
    it('should define three quick actions', () => {
      expect(QUICK_ACTIONS).toHaveLength(3);
    });

    it('should have ask_sage action', () => {
      const askSage = QUICK_ACTIONS.find((a) => a.id === 'ask_sage');
      expect(askSage).toBeDefined();
      expect(askSage?.title).toBe('Ask Sage');
      expect(askSage?.subtitle).toBe('Get wisdom guidance');
    });

    it('should have new_entry action', () => {
      const newEntry = QUICK_ACTIONS.find((a) => a.id === 'new_entry');
      expect(newEntry).toBeDefined();
      expect(newEntry?.title).toBe('New Entry');
      expect(newEntry?.subtitle).toBe('Write in your journal');
    });

    it('should have todays_wisdom action', () => {
      const todaysWisdom = QUICK_ACTIONS.find((a) => a.id === 'todays_wisdom');
      expect(todaysWisdom).toBeDefined();
      expect(todaysWisdom?.title).toBe("Today's Wisdom");
      expect(todaysWisdom?.subtitle).toBe('Daily inspiration');
    });
  });

  describe('initializeQuickActions', () => {
    it('should call setItems with all quick actions', async () => {
      await initializeQuickActions();

      expect(QuickActions.setItems).toHaveBeenCalledTimes(1);
      const callArgs = (QuickActions.setItems as jest.Mock).mock.calls[0][0];
      expect(callArgs).toHaveLength(3);
      expect(callArgs.map((a: QuickActions.Action) => a.id)).toEqual([
        'ask_sage',
        'new_entry',
        'todays_wisdom',
      ]);
    });

    it('should handle errors gracefully', async () => {
      (QuickActions.setItems as jest.Mock).mockRejectedValueOnce(
        new Error('Test error')
      );
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      await initializeQuickActions();

      expect(consoleSpy).toHaveBeenCalledWith(
        '[QuickActions] Failed to initialize:',
        expect.any(Error)
      );
      consoleSpy.mockRestore();
    });
  });

  describe('handleQuickAction', () => {
    it('should navigate to /ask for ask_sage action', () => {
      handleQuickAction({ id: 'ask_sage', title: 'Ask Sage' });

      expect(router.push).toHaveBeenCalledWith('/ask');
    });

    it('should navigate to journal with openModal param for new_entry action', () => {
      handleQuickAction({ id: 'new_entry', title: 'New Entry' });

      expect(router.push).toHaveBeenCalledWith('/(tabs)/journal?openModal=true');
    });

    it('should navigate to /ask with prompt for todays_wisdom action', () => {
      handleQuickAction({ id: 'todays_wisdom', title: "Today's Wisdom" });

      expect(router.push).toHaveBeenCalledWith(
        expect.stringContaining('/ask?prompt=')
      );
      expect(router.push).toHaveBeenCalledWith(
        expect.stringContaining(encodeURIComponent("Share today's wisdom with me"))
      );
    });

    it('should handle null action gracefully', () => {
      handleQuickAction(null);

      expect(router.push).not.toHaveBeenCalled();
    });

    it('should warn for unknown action ids', () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();

      handleQuickAction({ id: 'unknown_action', title: 'Unknown' });

      expect(consoleSpy).toHaveBeenCalledWith(
        '[QuickActions] Unknown action:',
        'unknown_action'
      );
      expect(router.push).not.toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe('getInitialQuickAction', () => {
    it('should return null when no initial action', () => {
      mockQuickActions.__setInitial?.(undefined);

      const result = getInitialQuickAction();

      expect(result).toBeNull();
    });

    it('should be a function that returns Action or null', () => {
      // Verify the function signature works correctly
      expect(typeof getInitialQuickAction).toBe('function');

      // The function should return null when no initial action
      // In production, this would return the action if app was launched from quick action
      const result = getInitialQuickAction();
      expect(result === null || typeof result === 'object').toBe(true);
    });
  });

  describe('subscribeToQuickActions', () => {
    it('should subscribe to quick action events', () => {
      const callback = jest.fn();

      subscribeToQuickActions(callback);

      expect(QuickActions.addListener).toHaveBeenCalledWith(callback);
    });

    it('should return unsubscribe function', () => {
      const callback = jest.fn();
      const mockRemove = jest.fn();
      (QuickActions.addListener as jest.Mock).mockReturnValue({ remove: mockRemove });

      const unsubscribe = subscribeToQuickActions(callback);
      unsubscribe();

      expect(mockRemove).toHaveBeenCalled();
    });
  });

  describe('Integration', () => {
    it('should correctly route all defined action types', () => {
      const actionTypes: QuickActionType[] = ['ask_sage', 'new_entry', 'todays_wisdom'];

      actionTypes.forEach((actionType) => {
        const action = QUICK_ACTIONS.find((a) => a.id === actionType);
        expect(action).toBeDefined();

        handleQuickAction({ id: actionType, title: action!.title });
        expect(router.push).toHaveBeenCalled();
      });
    });
  });
});
