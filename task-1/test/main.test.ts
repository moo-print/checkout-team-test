import { setTimeout } from 'timers/promises'

type Product = {
  commerceKey: string
  masterData: {
    staged: {
      name: {
        'en-US': string
      }
    }
  }
}

const productCreated: Product = {
  commerceKey: 's345738uhjnrnfdkjio4',
  masterData: {
    staged: {
      name: {
        'en-US': 'Essential Hardcover Notebook'
      }
    }
  }
}

const productUpdatedEvent = {
  detail: {
    currentProduct: {
      name: {
        'en-US': 'Essential Hardcover Notebooks'
      }
    }
  }
}

const callCTtoGetProduct = async (commerceKey: string) => {
  const product: Product = {
    commerceKey,
    masterData: {
      staged: {
        name: {
          'en-US': 'Essential Hardcover Notebook'
        }
      }
    }
  }
  return {
    body: product
  }
}

jest.setTimeout(20000)

describe('Product Updated Integration Test', () => {
  it('it should be able to create a product from a product create event', async () => {
    const product = await getProduct(0, updateCondition)
    expect(product.masterData.staged.name['en-US']).toEqual('Essential Hardcover Notebooks')
  })
})

// Do not edit code above

const getProduct = async (count = 0, updateCondition?: any): Promise<any> => {
  try {
    const httpResponse = await callCTtoGetProduct(productCreated.commerceKey)
    if (updateCondition && count < 5) {
      return updateCondition(httpResponse.body, count)
    }
    return httpResponse.body
  } catch (e) {
    count++
    if (count < 5) {
      await setTimeout(2000)
      return getProduct(count)
    }
    throw e
  }
}

const updateCondition = async (product: Product, count: number) => {
  if (product.masterData.staged.name['en-US'] === productUpdatedEvent.detail.currentProduct.name['en-US']) {
    return product
  } else {
    await setTimeout(2000)
    return getProduct(count++, updateCondition)
  }
}
