import random

cards = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10]

def deal_card():
    return random.choice(cards)

play = True

while play:
    user_cards = [deal_card(), deal_card()]
    computer_cards = [deal_card()]
    
    ask1 = input("Do you want to play a game of Blackjack? Type 'y' or 'n': ").lower()
    
    if ask1 != "y":
        break
        
    game_continue = True
    u_total = sum(user_cards)
    
    while game_continue:
        print(f"Your cards {user_cards}, total {u_total}")
        print(f"Computer 1st card number {computer_cards[0]}")
        
        # Check for blackjack
        if u_total == 21:
            print("You win with Blackjack! 🏆")
            game_continue = False
            break
        elif u_total > 21:
            # Check for ace to reduce value
            if 11 in user_cards:
                # Replace ace (11) with 1
                ace_index = user_cards.index(11)
                user_cards[ace_index] = 1
                u_total = sum(user_cards)
                print("Ace value changed from 11 to 1")
                continue
            else:
                print("You went over 21. You lose 💔")
                game_continue = False
                break
                
        ask2 = input("Do you want to draw another card? Type 'y' for yes and 'n' for no: ").lower()
        
        if ask2 == "y":
            user_cards.append(deal_card())
            u_total = sum(user_cards)
        else:
            game_continue = False
            
    # Computer's turn if player didn't bust
    if u_total <= 21:
        # Add computer's second card
        computer_cards.append(deal_card())
        c_total = sum(computer_cards)
        
        # Computer draws until it has at least 17
        while c_total < 17:
            computer_cards.append(deal_card())
            c_total = sum(computer_cards)
            # Check if computer has ace that should be converted to 1
            if c_total > 21 and 11 in computer_cards:
                ace_index = computer_cards.index(11)
                computer_cards[ace_index] = 1
                c_total = sum(computer_cards)
                
        print(f"Your final hand: {user_cards}, total: {u_total}")
        print(f"Computer's final hand: {computer_cards}, total: {c_total}")
        
        # Determine winner
        if c_total > 21:
            print("Computer went over 21. You win 🏆")
        elif u_total > c_total:
            print("You win 🏆")
        elif u_total < c_total:
            print("You lose 💔")
        else:
            print("It's a draw 🙃")
            
    print("\n" + "="*40 + "\n")