import { assertThat, is } from 'hamjest'
import r from 'ramda'

// rule 1: customer demo: vaporware
// rule 2: team demo: program after
// code review with other teams
//   give 1 piece of honest advice

const createKebab = r.when(r.is(String), r.split(', '))

const meats = ['mystery meat', 'lamb']
const fish = ['tuna']

const containsIngredient = r.curry(
  r.binary(
    r.compose(
      r.not,
      r.isEmpty,
      r.intersection
    )
  )
)
const containsMeat = containsIngredient(meats)
const containsFish = containsIngredient(fish)
const isPesc = r.complement(containsMeat)
const isVeg = r.complement(r.either(containsMeat, containsFish))

const removeOnions = r.difference(r.__, ['onion'])
const double = r.repeat(r.__, 2)

const doubleCheese = r.chain(r.ifElse(r.equals('cheese'), double, r.of))

describe('Kebab', () => {
  it('without any further ingredients', () => {
    assertThat(isVeg(createKebab([])), is(true))
  })
  it('with lamb is not veg', () => {
    assertThat(isVeg(createKebab(['lamb'])), is(false))
  })
  it('with another meat is not veg', () => {
    assertThat(isVeg(createKebab(['mystery meat'])), is(false))
  })
  it('with a vegetable is veg', () => {
    assertThat(isVeg(createKebab(['tomato'])), is(true))
  })
  it('is pesc when its veg', () => {
    assertThat(isPesc(createKebab(['tomato'])), is(true))
  })
  it('is not veg with fish', () => {
    assertThat(isVeg(createKebab(['tuna'])), is(false))
  })

  it('removes all onions', () => {
    assertThat(
      removeOnions(createKebab(['onion', 'foo', 'onion'])),
      is(createKebab(['foo']))
    )
  })

  it('doubles cheese', () => {
    assertThat(
      doubleCheese(createKebab('cheese, foo, cheese')),
      is(createKebab('cheese, cheese, foo, cheese, cheese'))
    )
  })

  it('create simply', () => {
    assertThat(createKebab('foo, bar'), is(createKebab(['foo', 'bar'])))
  })
})
