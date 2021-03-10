import { gql } from "@apollo/client";
import { ILooseObject } from "../interfaces/Interfaces";

export const schema = gql`
query EventHistoryQuery($archetype: ArchetypeInputType, $bundle: BundleSlug, $collections: [CollectionSlug!], $categories: [CollectionSlug!], $eventTypes: [EventType!], $cursor: String, $count: Int = 10, $showAll: Boolean = false, $identity: IdentityInputType) {
...EventHistory_data_3WnwJ9
}

fragment AccountLink_data on AccountType {
address
chain {
identifier
id
}
user {
username
id
}
...ProfileImage_data
...wallet_accountKey
}

fragment AssetCell_asset on AssetType {
collection {
name
id
}
name
...AssetMedia_asset
...asset_url
}

fragment AssetCell_assetBundle on AssetBundleType {
assetQuantities(first: 2) {
edges {
node {
asset {
  collection {
    name
    id
  }
  name
  ...AssetMedia_asset
  ...asset_url
  id
}
relayId
id
}
}
}
name
slug
}

fragment AssetMedia_asset on AssetType {
animationUrl
backgroundColor
collection {
description
displayData {
cardDisplayStyle
}
imageUrl
hidden
name
slug
id
}
description
name
tokenId
imageUrl
}

fragment AssetQuantity_data on AssetQuantityType {
asset {
...Price_data
id
}
quantity
}

fragment EventHistory_data_3WnwJ9 on Query {
assetEvents(after: $cursor, bundle: $bundle, archetype: $archetype, first: $count, categories: $categories, collections: $collections, eventTypes: $eventTypes, identity: $identity) {
edges {
node {
assetBundle @include(if: $showAll) {
  ...AssetCell_assetBundle
  id
}
assetQuantity {
  asset @include(if: $showAll) {
    ...AssetCell_asset
    id
  }
  ...quantity_data
  id
}
relayId
eventTimestamp
eventType
customEventName
devFee {
  quantity
  ...AssetQuantity_data
  id
}
devFeePaymentEvent {
  ...EventTimestamp_data
  id
}
fromAccount {
  address
  ...AccountLink_data
  id
}
price {
  quantity
  ...AssetQuantity_data
  id
}
endingPrice {
  quantity
  ...AssetQuantity_data
  id
}
seller {
  ...AccountLink_data
  id
}
toAccount {
  ...AccountLink_data
  id
}
winnerAccount {
  ...AccountLink_data
  id
}
...EventTimestamp_data
id
__typename
}
cursor
}
pageInfo {
endCursor
hasNextPage
}
}
}

fragment EventTimestamp_data on AssetEventType {
eventTimestamp
transaction {
blockExplorerLink
id
}
}

fragment Price_data on AssetType {
decimals
imageUrl
symbol
usdSpotPrice
assetContract {
blockExplorerLink
id
}
}

fragment ProfileImage_data on AccountType {
imageUrl
address
chain {
identifier
id
}
}

fragment asset_url on AssetType {
assetContract {
account {
address
chain {
identifier
id
}
id
}
id
}
tokenId
}

fragment quantity_data on AssetQuantityType {
asset {
decimals
id
}
quantity
}

fragment wallet_accountKey on AccountType {
address
chain {
identifier
id
}
}
`;

export const OS_SCHEMA = gql`
query AssetSearchQuery(
  $categories: [CollectionSlug!]
  $chains: [ChainScalar!]
  $collection: CollectionSlug
  $collectionQuery: String
  $collectionSortBy: CollectionSort
  $collections: [CollectionSlug!]
  $count: Int
  $cursor: String
  $identity: IdentityInputType
  $includeHiddenCollections: Boolean
  $includeIsListable: Boolean = false
  $numericTraits: [TraitRangeType!]
  $paymentAssets: [PaymentAssetSymbol!]
  $priceRange: RangeType
  $query: String
  $resultModel: SearchResultModel
  $shouldShowQuantity: Boolean = false
  $sortAscending: Boolean
  $sortBy: SearchSortBy
  $stringTraits: [TraitInputType!]
  $toggles: [SearchToggle!]
) {
  query {
    ...AssetSearch_data_1vY0Ya
  }
}

fragment AssetMedia_asset on AssetType {
  animationUrl
  backgroundColor
  collection {
    description
    displayData {
      cardDisplayStyle
    }
    imageUrl
    hidden
    name
    slug
    id
  }
  description
  name
  tokenId
  imageUrl
}

fragment AssetQuantity_data on AssetQuantityType {
  asset {
    ...Price_data
    id
  }
  quantity
}

fragment AssetSearchFilter_data_3zwQJ6 on Query {
  ...CollectionFilter_data_1W5IQW
  collection(collection: $collection) {
    numericTraits {
      key
      value {
        max
        min
      }
      ...NumericTraitFilter_data
    }
    stringTraits {
      key
      ...StringTraitFilter_data
    }
    id
  }
  ...PaymentFilter_data_2YoIWt
}

fragment AssetSearchList_data_4jiSzF on SearchResultType {
  asset {
    assetContract {
      account {
        address
        id
      }
      id
    }
    isListable @include(if: $includeIsListable)
    relayId
    tokenId
    ...AssetSelectionItem_data
    ...asset_url
    id
  }
  assetBundle {
    relayId
    id
  }
  ...Asset_data_fdERL
}

fragment AssetSearch_data_1vY0Ya on Query {
  ...CollectionHeadMetadata_data_2YoIWt
  ...AssetSearchFilter_data_3zwQJ6
  ...CategoryBar_data
  ...SearchPills_data_2Kg4Sq
  search(after: $cursor, chains: $chains, categories: $categories, collections: $collections, first: $count, identity: $identity, numericTraits: $numericTraits, paymentAssets: $paymentAssets, priceRange: $priceRange, querystring: $query, resultType: $resultModel, sortAscending: $sortAscending, sortBy: $sortBy, stringTraits: $stringTraits, toggles: $toggles) {
    edges {
      node {
        ...AssetSearchList_data_4jiSzF
        __typename
      }
      cursor
    }
    totalCount
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}

fragment AssetSelectionItem_data on AssetType {
  backgroundColor
  collection {
    displayData {
      cardDisplayStyle
    }
    imageUrl
    id
  }
  imageUrl
  name
  relayId
}

fragment Asset_data_fdERL on SearchResultType {
  asset {
    assetContract {
      account {
        address
        chain {
          identifier
          id
        }
        id
      }
      openseaVersion
      id
    }
    ownedQuantity(identity: $identity) @include(if: $shouldShowQuantity)
    decimals
    assetEventData {
      firstTransfer {
        timestamp
      }
      lastSale {
        timestamp
        unitPriceQuantity {
          ...AssetQuantity_data
          id
        }
      }
    }
    collection {
      name
      slug
      hidden
      id
    }
    name
    description
    externalLink
    hasUnlockableContent
    orderData {
      bestBid {
        orderType
        paymentAssetQuantity {
          ...AssetQuantity_data
          id
        }
      }
      bestAsk {
        closedAt
        orderType
        dutchAuctionFinalPrice
        openedAt
        priceFnEndedAt
        quantity
        decimals
        paymentAssetQuantity {
          quantity
          ...AssetQuantity_data
          id
        }
      }
    }
    relayId
    tokenId
    ...asset_url
    ...AssetMedia_asset
    id
  }
  assetBundle {
    assetCount
    assetEventData {
      lastSale {
        unitPriceQuantity {
          ...AssetQuantity_data
          id
        }
      }
    }
    assetQuantities(first: 18) {
      edges {
        node {
          asset {
            collection {
              name
              relayId
              id
            }
            ...AssetMedia_asset
            relayId
            id
          }
          id
        }
      }
    }
    name
    orderData {
      bestBid {
        orderType
        paymentAssetQuantity {
          ...AssetQuantity_data
          id
        }
      }
      bestAsk {
        closedAt
        orderType
        dutchAuctionFinalPrice
        openedAt
        priceFnEndedAt
        quantity
        decimals
        paymentAssetQuantity {
          ...AssetQuantity_data
          id
        }
      }
    }
    slug
    id
  }
}

fragment CategoryBar_data on Query {
  categories {
    imageUrl
    name
    slug
  }
}

fragment CollectionFilter_data_1W5IQW on Query {
  selectedCollections: collections(first: 25, collections: $collections, includeHidden: true) {
    edges {
      node {
        assetCount
        imageUrl
        name
        slug
        id
      }
    }
  }
  collections(assetOwner: $identity, chains: $chains, first: 100, includeHidden: $includeHiddenCollections, parents: $categories, query: $collectionQuery, sortBy: $collectionSortBy) {
    edges {
      node {
        assetCount
        imageUrl
        name
        slug
        id
        __typename
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}

fragment CollectionHeadMetadata_data_2YoIWt on Query {
  collection(collection: $collection) {
    bannerImageUrl
    description
    imageUrl
    name
    id
  }
}

fragment CollectionModalContent_data on CollectionType {
  description
  imageUrl
  name
  slug
}

fragment NumericTraitFilter_data on NumericTraitTypePair {
  key
  value {
    max
    min
  }
}

fragment PaymentFilter_data_2YoIWt on Query {
  paymentAssets(first: 10) {
    edges {
      node {
        asset {
          symbol
          id
        }
        relayId
        id
        __typename
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
  PaymentFilter_collection: collection(collection: $collection) {
    paymentAssets {
      asset {
        symbol
        id
      }
      relayId
      id
    }
    id
  }
}

fragment Price_data on AssetType {
  decimals
  imageUrl
  symbol
  usdSpotPrice
  assetContract {
    blockExplorerLink
    id
  }
}

fragment SearchPills_data_2Kg4Sq on Query {
  selectedCollections: collections(first: 25, collections: $collections, includeHidden: true) {
    edges {
      node {
        imageUrl
        name
        slug
        ...CollectionModalContent_data
        id
      }
    }
  }
}

fragment StringTraitFilter_data on StringTraitType {
  counts {
    count
    value
  }
  key
}

fragment asset_url on AssetType {
  assetContract {
    account {
      address
      chain {
        identifier
        id
      }
      id
    }
    id
  }
  tokenId
}
`;

export const OS_VARS = (name: string, traits: ILooseObject[], collection: string) => {
  return {
    "categories": null,
    "chains": null,
    "collection": collection,
    "collectionQuery": null,
    "collectionSortBy": "SEVEN_DAY_VOLUME",
    "collections": [
      "nftboxes"
    ],
    "count": 32,
    "cursor": null,
    "identity": null,
    "includeHiddenCollections": null,
    "includeIsListable": false,
    "numericTraits": null,
    "paymentAssets": null,
    "priceRange": null,
    "query": name,
    "resultModel": "ASSETS",
    "shouldShowQuantity": false,
    "sortAscending": false,
    "sortBy": "LAST_SALE_DATE",
    "stringTraits": traits,
    "toggles": null
  }
};