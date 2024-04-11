Feature: Business rules
  In order to achieve my goals
  As a persona
  I want to be able to interact with a system

  Scenario: Test 1
    Given I have products in my cart
      | name         | category    | price  |
      | Harry Potter | Books       | 5      |
      | iPhone 5     | Smartphones | 1200   |
      | Nuclear Bomb | Weapons     | 100000 |

  Scenario: Test 2
    Given test com tabela usando raw
    | Harry | Potter  |
    | Chuck | Norris  |
    | Jogo  | FC      |
  
  Scenario: Test 3
    Given test com tabela usando hashes
    | name  | surname | position |
    | Harry | Potter  | Seeker   |

  Scenario: Test 4
    Given test com tabela usando rowrash
    | name     | Harry  |
    | surname  | Potter |
    | position | Seeker |

  Scenario: geracao massa faker
    Given que gere a massa

  Scenario: chamada na api
    Given que faça uma chamada na api

  Scenario Outline: order discount
    Given I have product with price <price>$ in my cart
    Then I should see overall price is "<total>" $

    Examples:
      | price | total |
      | 10    | 10    |
      | 20    | 20    |
      | 21    | 18.9  |
      | 30    | 27    |
      | 50    | 45    |

  Scenario Outline: check parameter substitution
    Given I use "<browser>"
    When I see "<text>" text and "<text>"
    Examples:
      | text      | browser |
      | Bem vindo | Google  |
      | Ola       | Bing    |

  Scenario Outline: Test com plugin faker transform
    Given tenha um produto "<productName>"
    When seja uma pessoa com nome "<customer>"
    And tenha um email "<email>"
    And dado do tipo "<anythingMore>"

    Examples:
      | productName          | customer                | email              | anythingMore |
      | {{commerce.product}} | Dr. {{person.fullName}} | {{internet.email}} | staticData   |
      | {{commerce.product}} | Dr. {{person.fullName}} | {{internet.email}} | staticData   |
